/**
 * "Ink and hanji": the page itself is the material. A single full-screen fragment shader paints
 * Korean mulberry paper (hanji) and ink, and scrolling moves ink through the paper:
 *   0 paper with an ink-marbled 同胞 -> 1 ink blooms outward from the glyph and floods the page
 *   -> 2 paper returns through bamboo-blind slats -> 3 ink rises like a tide -> 4 red seal ink floods from the right.
 * The DOM carries the typography; the shader carries the surface. Raw WebGL, one triangle.
 */

const VERT = `attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 uRes, uGlyphC, uGlyphS, uPointer;
uniform float uTime, uB, uM, uPointerOn;
uniform sampler2D uTex;

const vec3 PAPER = vec3(0.952, 0.929, 0.878);
const vec3 INK = vec3(0.043, 0.071, 0.125);
const vec3 RED = vec3(0.784, 0.208, 0.169);
const vec3 BRASS = vec3(0.86, 0.66, 0.28);

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0 - 2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a*noise(p); p = p*2.03 + 17.0; a *= 0.5; }
  return v;
}
vec3 stateCol(float i){ return i < 0.5 ? PAPER : (i < 1.5 ? INK : (i < 2.5 ? PAPER : (i < 3.5 ? INK : RED))); }
float statePaper(float i){ return (i < 0.5 || (i > 1.5 && i < 2.5)) ? 1.0 : 0.0; }

void main(){
  vec2 fc = gl_FragCoord.xy;
  float H = uRes.y;
  vec2 uv = fc / uRes;
  float t = uTime;
  vec2 pn = (fc - uPointer) / H;
  float pw = exp(-dot(pn, pn) * 16.0) * uPointerOn;
  vec2 q = uv * vec2(uRes.x / H, 1.0);
  float n = fbm(q*2.4 + vec2(t*0.035, -t*0.02) + pw*0.4*vec2(pn.y, -pn.x));

  float b = floor(uB + 0.001);
  float m = uM;
  float mask = 0.0;
  vec3 rimC = INK;
  float slat = 0.0;

  if (b < 0.5) {
    vec2 p0 = (fc - uGlyphC) / H;
    float front = m * (uRes.x / H * 0.8 + 0.95);
    mask = (1.0 - smoothstep(-0.07, 0.07, length(p0) + (n - 0.5)*0.6 - front)) * smoothstep(0.0, 0.04, m);
    rimC = RED;
  } else if (b < 1.5) {
    float sx = fc.x / uRes.x * 34.0;
    float h = hash(vec2(floor(sx), 3.1));
    float rp = smoothstep(h*0.42, h*0.42 + 0.55, m);
    float top = 1.0 - uv.y;
    mask = (1.0 - smoothstep(-0.015, 0.015, top - rp*1.2 + (n - 0.5)*0.1)) * smoothstep(0.0, 0.03, m);
    slat = smoothstep(0.47, 0.5, abs(fract(sx) - 0.5)) * sin(3.14159*m) * 0.55;
    rimC = INK;
  } else if (b < 2.5) {
    float tide = m*1.7 - uv.y + (n - 0.5)*0.4 + (fbm(vec2(fc.x/H*14.0, t*0.05)) - 0.5)*0.25;
    mask = smoothstep(-0.03, 0.03, tide) * smoothstep(0.0, 0.06, m);
    rimC = BRASS;
  } else if (b < 3.5) {
    vec2 p3 = (fc - vec2(uRes.x*0.7, uRes.y*0.5)) / H;
    float front = m * 2.8;
    mask = (1.0 - smoothstep(-0.05, 0.05, length(p3) + (n - 0.5)*0.35 - front)) * smoothstep(0.0, 0.04, m);
    rimC = BRASS;
  }

  vec3 CA = stateCol(b), CB = stateCol(min(b + 1.0, 4.0));
  float pA = statePaper(b), pB = statePaper(min(b + 1.0, 4.0));
  vec3 col = mix(CA, CB, mask);
  float paper = mix(pA, pB, mask);

  // Ink-marbled 同胞 on the first sheet of paper.
  if (b < 0.5) {
    vec2 gu = (fc - uGlyphC) / uGlyphS + 0.5;
    float inside = step(0.0, gu.x) * step(gu.x, 1.0) * step(0.0, gu.y) * step(gu.y, 1.0);
    float g = texture2D(uTex, gu).a * inside;
    float mv = fbm(gu * vec2(3.2, 2.2) * 2.0 + vec2(t*0.05, -t*0.04));
    vec3 gc = mix(INK, RED, smoothstep(0.38, 0.62, mv));
    gc *= 0.92 + 0.12 * noise(gu * 140.0);
    col = mix(col, gc, g * (1.0 - mask));
  }

  // Paper fibers (long, vertical), ink grain, faint contour lines.
  float fiber = noise(vec2(fc.x*0.9, fc.y*0.05)) * 0.6 + noise(fc*0.4) * 0.4;
  col *= mix(1.0, 0.955 + fiber*0.07, paper);
  col += (hash(fc + 3.0) - 0.5) * 0.022 * (1.0 - paper);
  float cl = fbm(q*1.15 + vec2(t*0.008, 5.0));
  float line = 1.0 - smoothstep(0.0, 0.04, abs(fract(cl*11.0) - 0.5) * 2.0 - 0.92 + 0.0);
  line = 1.0 - smoothstep(0.0, 0.035, abs(fract(cl*11.0) - 0.5));
  col *= 1.0 - line * 0.07 * paper;
  col += line * 0.04 * (1.0 - paper);

  col = mix(col, INK, slat);
  float rim = exp(-pow((mask - 0.5)*7.0, 2.0)) * step(0.002, m) * step(m, 0.998);
  col = mix(col, rimC, rim * 0.5);

  gl_FragColor = vec4(col, 1.0);
}`

export type SceneHandle = { destroy: () => void }

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader")
  return s
}

export async function createScene(opts: {
  canvas: HTMLCanvasElement
  track: HTMLElement
  displayFont: string
  onChapter?: (i: number) => void
  onProgress?: (cur: number) => void
}): Promise<SceneHandle> {
  const { canvas, track } = opts
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" })
  if (!gl) throw new Error("no webgl")

  // Glyph mask: 同胞 drawn once with the site's own display face.
  await document.fonts.ready
  try { await document.fonts.load(`900 120px ${opts.displayFont}`, "同胞") } catch { /* system CJK fallback */ }
  const gc = document.createElement("canvas")
  gc.width = 1024; gc.height = 512
  const g2 = gc.getContext("2d")!
  g2.fillStyle = "#fff"
  g2.textAlign = "center"
  g2.font = `900 470px ${opts.displayFont}, "Apple SD Gothic Neo", "PingFang SC", serif`
  const mt = g2.measureText("同胞")
  g2.fillText("同胞", 512, 256 + (mt.actualBoundingBoxAscent - mt.actualBoundingBoxDescent) / 2)

  const prog = gl.createProgram()!
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link")
  gl.useProgram(prog)

  const vb = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, vb)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(prog, "aPos")
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const tex = gl.createTexture()!
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, gc)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  const U = (n: string) => gl.getUniformLocation(prog, n)
  const u = { res: U("uRes"), glyphC: U("uGlyphC"), glyphS: U("uGlyphS"), pointer: U("uPointer"), time: U("uTime"), b: U("uB"), m: U("uM"), pOn: U("uPointerOn"), tex: U("uTex") }
  gl.uniform1i(u.tex, 0)

  const narrow = window.matchMedia("(max-width: 47.99rem)").matches
  let dprCap = narrow ? 1 : 1.25
  let W = 1, H = 1, dpr = 1
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, dprCap)
    const r = canvas.getBoundingClientRect()
    W = Math.max(1, r.width); H = Math.max(1, r.height)
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(u.res, canvas.width, canvas.height)
    let gw: number, cx: number, cy: number
    if (W < 768) { gw = Math.min(W * 0.82, H * 0.3); cx = 0.5; cy = 0.25 }
    else { gw = Math.min(W * 0.5, H * 1.2); cx = 0.73; cy = 0.5 }
    gl.uniform2f(u.glyphC, cx * W * dpr, (1 - cy) * H * dpr)
    gl.uniform2f(u.glyphS, gw * dpr, (gw / 2) * dpr)
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)

  const N = 5
  let target = 0, cur = 0, lastChapter = -1
  const readTarget = () => {
    const r = track.getBoundingClientRect()
    target = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight))) * (N - 1)
  }

  let px = -9999, py = -9999, pOn = 0, pT = 0
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return
    const r = canvas.getBoundingClientRect()
    px = (e.clientX - r.left) * dpr
    py = (r.height - (e.clientY - r.top)) * dpr
    pT = 1
  }
  const onLeave = () => { pT = 0 }
  window.addEventListener("pointermove", onMove, { passive: true })
  document.addEventListener("pointerleave", onLeave)

  let visible = true, running = false, raf = 0
  let last = performance.now(); const t0 = last
  let frames = 0, acc = 0

  const frame = (now: number) => {
    raf = 0
    if (!visible || document.hidden) { running = false; return }
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    readTarget()
    cur += (target - cur) * (1 - Math.exp(-dt * 6))
    pOn += (pT - pOn) * (1 - Math.exp(-dt * 6))

    if (frames < 90) { acc += dt; frames++; if (frames === 90 && acc / 90 > 0.024 && dprCap > 0.75) { dprCap = 0.75; resize() } }

    const b = Math.min(N - 1, Math.floor(cur + 1e-4))
    const f = b >= N - 1 ? 0 : cur - b
    let m = f < 0.14 ? 0 : f > 0.86 ? 1 : (f - 0.14) / 0.72
    m = m * m * (3 - 2 * m)
    const chapter = Math.round(cur)
    if (chapter !== lastChapter) { lastChapter = chapter; opts.onChapter?.(chapter) }
    opts.onProgress?.(cur)

    gl.uniform1f(u.b, b)
    gl.uniform1f(u.m, m)
    gl.uniform1f(u.time, (now - t0) / 1000)
    gl.uniform2f(u.pointer, px, py)
    gl.uniform1f(u.pOn, pOn)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    raf = requestAnimationFrame(frame)
  }
  const kick = () => {
    if (running || !visible || document.hidden) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }
  const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) kick() }, { rootMargin: "80px" })
  io.observe(track)
  const onVis = () => { if (!document.hidden) kick() }
  document.addEventListener("visibilitychange", onVis)
  readTarget()
  kick()

  return {
    destroy() {
      if (raf) cancelAnimationFrame(raf)
      running = false
      io.disconnect(); ro.disconnect()
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVis)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    },
  }
}
