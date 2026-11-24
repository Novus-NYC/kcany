/**
 * All visible copy, in Korean (source of truth, from kcany.com), Simplified Chinese and English.
 * Chinese and English are translations written for this build: the client should review them.
 */
export type L = { ko: string; zh: string; en: string }
const l = (ko: string, zh: string, en: string): L => ({ ko, zh, en })

export const nav = [
  { href: "/about", label: l("협회소개", "协会介绍", "About"), sub: l("About", "About", "소개") },
  { href: "/news", label: l("동포 새소식", "同胞新闻", "News"), sub: l("News", "News", "새소식") },
  { href: "/contact", label: l("문의하기", "联系我们", "Contact"), sub: l("Contact", "Contact", "문의") },
]
export const home = l("홈", "首页", "Home")
export const donate = l("후원하기", "捐赠支持", "Donate")
export const ui = {
  menu: l("메뉴", "菜单", "Menu"),
  close: l("닫기", "关闭", "Close"),
  skip: l("본문으로 건너뛰기", "跳到正文", "Skip to content"),
  mainNav: l("주 메뉴", "主菜单", "Main menu"),
  footNav: l("푸터 메뉴", "页脚菜单", "Footer menu"),
  homeLabel: l("홈으로", "返回首页", "Back to home"),
  language: l("언어", "语言", "Language"),
  about: l("협회소개", "协会介绍", "About us"),
  story: l("협회 소개", "协会简介", "Introduction"),
  chapterNav: l("장 이동", "章节导航", "Chapter navigation"),
  quick: l("바로가기", "快速导航", "Quick links"),
  office: l("플러싱 사무실", "法拉盛办公室", "Flushing office"),
  tagline: l(
    "뉴욕에 사는 조선족 동포의 권익 보호와 화합을 위한 비영리 단체.",
    "致力于维护纽约朝鲜族同胞权益、促进团结的非营利组织。",
    "A nonprofit protecting the rights and unity of Korean-Chinese New Yorkers.",
  ),
}

export const org = {
  name: l("뉴욕 조선족 동포회", "纽约朝鲜族同胞会", "The Korean-Chinese Association of New York"),
  nameSub: l("The Korean-Chinese Association of New York", "The Korean-Chinese Association of New York", "뉴욕 조선족 동포회"),
  place: l("플러싱, 뉴욕", "纽约法拉盛", "Flushing, New York"),
}

export const pageMeta: Record<string, { title: L; description: L }> = {
  "/": {
    title: l("뉴욕 조선족 동포회 | The Korean-Chinese Association of New York", "纽约朝鲜族同胞会 | The Korean-Chinese Association of New York", "The Korean-Chinese Association of New York | 뉴욕 조선족 동포회"),
    description: l(
      "뉴욕 플러싱에 있는 비영리 단체. 뉴욕에 사는 조선족 동포의 권익 보호와 화합, 문화 교류, 차세대 교육을 위해 일합니다.",
      "位于纽约法拉盛的非营利组织，致力于维护纽约朝鲜族同胞的权益、促进团结、文化交流与下一代教育。",
      "A nonprofit in Flushing, New York, working for the rights, unity and cultural life of Korean-Chinese (Joseonjok) New Yorkers.",
    ),
  },
  "/about": {
    title: l("협회소개 | 뉴욕 조선족 동포회", "协会介绍 | 纽约朝鲜族同胞会", "About | The Korean-Chinese Association of New York"),
    description: l("뉴욕조선족동포회가 하는 일과 가치. 커뮤니티 지원, 문화와 유산 보존, 네트워킹과 성장.", "纽约朝鲜族同胞会的工作与价值：社区支持、文化传承、人脉交流与成长。", "What the association does and stands for: community support, culture and heritage, networking and growth."),
  },
  "/news": {
    title: l("동포 새소식 | 뉴욕 조선족 동포회", "同胞新闻 | 纽约朝鲜族同胞会", "News | The Korean-Chinese Association of New York"),
    description: l("뉴욕 조선족 동포 새소식 게시판. 동포 사회와 세계 소식을 모아 전합니다.", "纽约朝鲜族同胞新闻板块，汇集同胞社区与世界各地的消息。", "The association's news board, with community and world news."),
  },
  "/contact": {
    title: l("문의하기 | 뉴욕 조선족 동포회", "联系我们 | 纽约朝鲜族同胞会", "Contact | The Korean-Chinese Association of New York"),
    description: l("뉴욕조선족동포회 연락처와 위치. 플러싱 Union St. 사무실, 전화, 이메일.", "纽约朝鲜族同胞会的联系方式与地址：法拉盛 Union St. 办公室、电话、邮箱。", "Contact details and location: our Union St. office in Flushing, phone and email."),
  },
  "/donate": {
    title: l("후원하기 | 뉴욕 조선족 동포회", "捐赠支持 | 纽约朝鲜族同胞会", "Donate | The Korean-Chinese Association of New York"),
    description: l("뉴욕조선족동포회의 활동을 후원해 주세요. 문화 행사, 차세대 교육과 멘토링, 동포 포털 운영에 쓰입니다.", "支持纽约朝鲜族同胞会的活动：文化活动、下一代教育与导师指导、同胞门户网站运营。", "Support the association: cultural events, next-generation education and mentoring, and the community portal."),
  },
}

export type Chapter = { id: string; tag: L; title: L; body: L; glyph: string; cta?: { label: L; href: string } }
export const chapters: Chapter[] = [
  {
    id: "origin",
    tag: l("同胞 · 동포", "同胞 · Compatriots", "同胞 · Compatriots"),
    title: l("흩어진 마음을\n[한 줄]로 엮습니다", "把散落的心\n[串成一线]", "Scattered hearts,\nwoven into [one]"),
    body: l(
      "동포(同胞)는 한 배에서 났다는 뜻입니다. 뉴욕조선족동포회는 이 도시에 사는 조선족 동포의 권익 보호와 화합을 위해 세워진 비영리 단체입니다.",
      "“同胞”意为同出一胞。纽约朝鲜族同胞会是一家非营利组织，致力于维护居住在纽约的朝鲜族同胞的权益，促进团结。",
      "동포 (同胞) means born of the same womb. The Korean-Chinese Association of New York is a nonprofit founded to protect the rights and strengthen the unity of Korean-Chinese (Joseonjok) New Yorkers.",
    ),
    glyph: "同胞",
  },
  {
    id: "gather",
    tag: l("모임 · Gatherings", "聚会 · Gatherings", "Gatherings"),
    title: l("얼굴을 마주하는\n[자리]를 만듭니다", "搭建一个\n[见面]的地方", "We make a [place]\nto meet face to face"),
    body: l(
      "설날과 추석 같은 전통 명절 행사, 세미나와 워크숍, 커뮤니티 모임. 서로 얼굴을 보며 유대를 쌓는 자리를 마련합니다.",
      "春节、中秋等传统节日活动，讲座与工作坊，社区聚会。为大家创造面对面交流、增进情谊的机会。",
      "Seollal and Chuseok holiday events, seminars and workshops, community gatherings. We make room for people to meet face to face and build ties.",
    ),
    glyph: "모임",
    cta: { label: l("협회 활동 보기", "了解协会活动", "See our activities"), href: "/about" },
  },
  {
    id: "scripts",
    tag: l("한글 · 漢字 · ABC", "韩文 · 汉字 · ABC", "Hangul · Hanja · ABC"),
    title: l("글자는 [셋],\n마음은 하나", "三种[文字]，\n一颗心", "Three [scripts],\none heart"),
    body: l(
      "한글로 말하고, 한자로 이름을 쓰고, 영어로 일을 처리합니다. 협회의 로고에도 세 나라의 흔적이 함께 놓여 있습니다.",
      "用韩文交谈，用汉字书写姓名，用英文处理事务。协会的标志里，也同时留有三个国家的印记。",
      "We speak in Hangul, write names in Chinese characters, and handle daily business in English. The association's logo carries traces of all three countries too.",
    ),
    glyph: "文",
  },
  {
    id: "connect",
    tag: l("연결 · Moduja.com", "连接 · Moduja.com", "Connect · Moduja.com"),
    title: l("필요한 [소식]과\n[일자리]를 잇습니다", "连接所需的[资讯]\n与[工作]", "Connecting you to\n[news] and [jobs]"),
    body: l(
      "동포 소식, 사고팔기, 구인구직, 부동산, 자유게시판. 협회가 운영하는 포털 Moduja.com에서 생활에 필요한 정보를 나눕니다.",
      "同胞资讯、二手买卖、招聘求职、房产、自由留言板。在协会运营的门户网站 Moduja.com 分享生活所需的信息。",
      "Community news, buy and sell, jobs, real estate and a free board. Share what everyday life needs on Moduja.com, the portal the association runs.",
    ),
    glyph: "連",
    cta: { label: l("Moduja.com 열기", "打开 Moduja.com", "Open Moduja.com"), href: "https://www.moduja.com/" },
  },
  {
    id: "next",
    tag: l("차세대 · Next generation", "下一代 · Next generation", "Next generation"),
    title: l("뿌리를 잊지 않는\n[다음 세대]", "不忘根本的\n[下一代]", "A [next generation]\nthat remembers its roots"),
    body: l(
      "교육 프로그램과 멘토링으로 젊은 세대가 자신의 뿌리에 자부심을 갖고 글로벌 사회에서 성장하도록 돕습니다. 협회의 활동은 후원으로 이어집니다.",
      "通过教育项目和导师指导，帮助年轻一代怀着对根的自豪，在全球化社会中成长。协会的活动离不开各位的支持。",
      "Through education programs and mentoring, we help young people grow with pride in their roots in a global society. The association's work is carried on by your support.",
    ),
    glyph: "根",
    cta: { label: donate, href: "/donate" },
  },
]
export const heroLink = l("협회소개", "协会介绍", "About us")
export const visuals = {
  words: [l("설날", "春节", "Seollal"), l("추석", "中秋", "Chuseok")],
  marquee1: l("한글 · 漢字 · ABC ·", "韩文 · 汉字 · ABC ·", "Hangul · Hanja · ABC ·"),
  marquee2: l("가 · 家 · A ·", "가 · 家 · A ·", "가 · 家 · A ·"),
  root: l("뿌리", "根", "Roots"),
  modujaAlt: l(
    "Moduja.com 포털의 데스크톱과 모바일 화면. 홈, 조선족 동포 새소식, 구인구직, 부동산, 사고팔기, 자유게시판 메뉴가 보입니다.",
    "Moduja.com 门户网站的电脑与手机界面，可见首页、朝鲜族同胞新闻、招聘求职、房产、二手买卖、自由留言板等菜单。",
    "Moduja.com on desktop and phone, showing menus for home, community news, jobs, real estate, buy and sell, and a free board.",
  ),
}

export const pillars = [
  {
    title: l("커뮤니티 지원", "社区支持", "Community support"),
    en: l("Community support", "Community support", "커뮤니티 지원"),
    body: l(
      "동포 소식, 사고팔기, 구인구직, 부동산, 자유게시판. 생활에 실제로 도움이 되는 플랫폼을 운영하고, 커뮤니티 안의 상호 지원을 키웁니다.",
      "同胞资讯、二手买卖、招聘求职、房产、自由留言板。运营真正能帮到生活的平台，增进社区内的互助。",
      "A platform that helps with real life: community news, buy and sell, jobs, real estate and a free board, strengthening mutual support inside the community.",
    ),
  },
  {
    title: l("문화와 유산 보존", "文化与传承", "Culture and heritage"),
    en: l("Culture and heritage", "Culture and heritage", "문화와 유산"),
    body: l(
      "조선족의 정체성을 이어 가는 문화 행사를 기획합니다. 설날, 추석 같은 전통 명절과 함께 현대적인 문화 교류 프로그램도 마련합니다.",
      "策划延续朝鲜族身份认同的文化活动。既有春节、中秋等传统节日，也有富有现代感的文化交流项目。",
      "We organize cultural events that carry the Joseonjok identity forward, from traditional holidays like Seollal and Chuseok to modern cultural exchange programs.",
    ),
  },
  {
    title: l("네트워킹과 성장", "交流与成长", "Networking and growth"),
    en: l("Networking and growth", "Networking and growth", "네트워킹과 성장"),
    body: l(
      "동포 사이의 네트워크를 만들고 여러 세대가 교류할 기회를 열어 줍니다. 차세대 동포를 위한 멘토링과 교육 지원도 진행합니다.",
      "搭建同胞之间的网络，为不同世代提供交流的机会，并为下一代同胞开展导师指导和教育支持。",
      "We build networks among compatriots and open chances for generations to meet, with mentoring and educational support for the next generation.",
    ),
  },
]

export const homeSections = {
  workKicker: l("협회가 하는 일", "协会的工作", "What we do"),
  workTitle: l("사람을 잇고,\n문화를 지키고,\n다음 세대를 키웁니다", "联结人心，\n守护文化，\n培育下一代", "Connecting people,\nkeeping culture,\nraising the next generation"),
  newsTitle: l("동포 새소식", "同胞新闻", "News"),
  newsAll: l("새소식 전체 보기 →", "查看全部新闻 →", "See all news →"),
}

export const cta = {
  title: l("함께해 주세요", "欢迎与我们同行", "Join us"),
  newsTitle: l("소식을 알려 주세요", "欢迎提供消息", "Got news to share?"),
  body: l(
    "협회의 활동은 동포들의 참여와 후원으로 이어집니다. 후원 방법이나 협회 활동이 궁금하시면 편하게 연락 주세요.",
    "协会的活动离不开同胞的参与和捐赠。如想了解捐赠方式或协会活动，欢迎随时联系。",
    "The association's work runs on participation and donations from the community. Get in touch anytime to ask about giving or our activities.",
  ),
}

export const about = {
  kicker: l("협회소개 · About", "协会介绍 · About", "About"),
  title: l("뉴욕의 조선족 동포를 위한 중심 허브", "为纽约朝鲜族同胞服务的中心枢纽", "A hub for Korean-Chinese New Yorkers"),
  lead: l("뉴욕 지역에 사는 조선족 동포를 위한 중심 허브.", "为居住在纽约地区的朝鲜族同胞而设的中心枢纽。", "The central hub for Korean-Chinese compatriots living in the New York area."),
  paragraphs: [
    l(
      "뉴욕조선족동포회는 뉴욕에 사는 조선족 동포들의 연결을 강화하고, 다양한 지원으로 삶의 질을 높이기 위해 설립되었습니다.",
      "纽约朝鲜族同胞会成立的目的，是加强居住在纽约的朝鲜族同胞之间的联系，并通过多种支持提升大家的生活品质。",
      "The association was founded to strengthen ties among Korean-Chinese compatriots in New York and to improve their quality of life through many kinds of support.",
    ),
    l(
      "협회는 뉴욕 조선족 커뮤니티의 전통과 문화를 지키며, 동포들이 서로 돕고 함께 성장할 수 있는 공간을 제공합니다. 문화 교류 행사, 네트워킹 이벤트, 세미나와 워크숍을 열어 동포들의 정착과 안정을 지원합니다.",
      "协会守护纽约朝鲜族社区的传统与文化，提供同胞们互相帮助、共同成长的空间。我们举办文化交流活动、人脉交流活动、讲座和工作坊，支持同胞顺利落脚、安定生活。",
      "We preserve the traditions and culture of the New York Korean-Chinese community and give compatriots a place to help one another and grow together. Cultural exchange events, networking events, seminars and workshops support their settling in and stability.",
    ),
    l(
      "함께 웃고, 함께 배우고, 함께 도약하는 커뮤니티. 단순한 지원 단체를 넘어 가족처럼 서로 의지할 수 있는 곳을 목표로 합니다.",
      "一起欢笑，一起学习，一起腾飞的社区。我们不只是一个援助团体，更希望成为像家人一样彼此依靠的地方。",
      "A community that laughs, learns and leaps together. We aim to be more than a support group: a place where people lean on each other like family.",
    ),
  ],
  closing: l(
    "앞으로도 미동부 조선족 동포들의 권익 보호를 위해 노력하며, 이민자들이 새로운 사회에서 번영할 수 있도록 든든한 지원을 이어 가겠습니다.",
    "今后我们仍将努力维护美东朝鲜族同胞的权益，为移民在新社会中繁荣发展提供坚实的支持。",
    "We will keep working to protect the rights of Korean-Chinese compatriots on the East Coast and give immigrants solid support to thrive in their new society.",
  ),
  mission: [
    l("동포들의 권익 보호", "维护同胞权益", "Protecting compatriots' rights"),
    l("이민자의 성공적인 정착 지원", "支持移民顺利落脚", "Supporting immigrants' successful settlement"),
    l("차세대 조선족 리더 육성", "培养朝鲜族下一代领袖", "Developing the next generation of Korean-Chinese leaders"),
    l("문화 교류와 교육, 사회적 지지 체계 구축", "推动文化交流、教育与社会支持体系建设", "Cultural exchange, education and a social support network"),
  ],
  missionTitle: l("협회의 약속", "协会的承诺", "Our commitments"),
  doTitle: l("주요 활동", "主要活动", "Our work"),
  logoAlt: l(
    "협회 로고. 지구 위로 미국과 중국 국기 색이 놓여 있고, 한자 紐約朝鮮族同胞會가 둘러 있습니다.",
    "协会标志。地球之上有美国与中国国旗的色彩，周围环绕着汉字“紐約朝鮮族同胞會”。",
    "The association's logo: a globe under American and Chinese flag colors, ringed by the Chinese characters 紐約朝鮮族同胞會.",
  ),
  logoCaption: l("로고 위쪽에는 한자로 紐約朝鮮族同胞會라고 적혀 있습니다.", "标志上方以汉字写着“紐約朝鮮族同胞會”。", "The top of the logo reads 紐約朝鮮族同胞會 in Chinese characters."),
}

export type NewsItem = { title: string; excerpt: string; date: L; views: L }
/**
 * Posts from the source site's news board (permalinks end in "게시판-테스트-1..5", all dated 9/14/2024).
 * They are Korean-language articles, so they stay in Korean in every language.
 */
export const news: NewsItem[] = [
  { title: "오콘조이웨알라 WTO 사무총장, ‘자유무역 체제 유지가 식량 및 빈곤 문제 해결의 열쇠’", excerpt: "세계무역기구(WTO) 사무총장 응고지 오콘조이웨알라는 최근 연설에서 개방적이고 자유로운 무역 체제가 세계의 식량 및…", views: "1K" },
  { title: "199대 미 연방 하원, 20년 만에 여성 상임위원장 ‘제로’", excerpt: "최근 발생한 글로벌 위기는 정치, 경제, 사회 전반에 걸쳐 막대한 영향을 미치며 국제…", views: "1K" },
  { title: "개도국 공공부채 4경원 돌파, 트럼프 당선인 불확실성 속 이자 부담 우려", excerpt: "개발도상국들의 공공부채가 지난해 4경 원을 넘어서면서, 이들 국가의 이자 부담이 급증하고 있습니다. 이러한…", views: "1K" },
  { title: "프레디 프리먼, 월드시리즈 끝내기 만루홈런 공 156만달러에 낙찰", excerpt: "로스앤젤레스 다저스가 2024년 월드시리즈에서 인상적인 역전승으로 우승을 차지하며 팬들에게 잊지 못할 순간을 선사했다…", views: "1K" },
  { title: "비트코인 사상 최고가 경신: 월가 투자 거물들의 변화된 시선", excerpt: "비트코인 가격이 사상 최고가를 기록하면서 금융계와 투자자들 사이에서 비트코인에 대한 관심이 다시금 높아지고…", views: "949" },
].map((n) => ({
  title: n.title,
  excerpt: n.excerpt,
  date: l("2024년 9월 14일", "2024年9月14日", "September 14, 2024"),
  views: n.views === "1K" ? l("1천", "1千", "1K") : l(n.views, n.views, n.views),
}))

export const newsPage = {
  kicker: l("동포 새소식 · News", "同胞新闻 · News", "News"),
  title: l("뉴욕 조선족 동포 새소식", "纽约朝鲜族同胞新闻", "News for Korean-Chinese New Yorkers"),
  lead: l("동포 소식과 생활 정보는 협회 포털 Moduja.com에서도 이어집니다.", "同胞资讯与生活信息也可在协会门户网站 Moduja.com 查看。", "Community news and everyday information also continue on the association's portal, Moduja.com."),
  views: l("조회", "浏览", "views"),
  note: l("게시글은 한국어로 작성되어 있습니다.", "帖子为韩文原文。", "Posts are written in Korean."),
  moreBefore: l("더 많은 동포 소식과 구인구직, 부동산, 사고팔기 게시판은 ", "更多同胞资讯，以及招聘求职、房产、二手买卖板块，请访问 ", "For more community news and the jobs, real estate and buy-and-sell boards, visit "),
  moreAfter: l("에서 확인하세요.", "。", "."),
  aria: l("새소식 목록", "新闻列表", "News list"),
}

export const contact = {
  kicker: l("문의하기 · Contact", "联系我们 · Contact", "Contact"),
  title: l("편하게 연락 주세요", "欢迎随时联系", "Get in touch"),
  lead: l("협회 활동, 행사, 후원에 관한 문의를 받습니다.", "欢迎咨询协会活动、节日活动与捐赠事宜。", "Ask us about the association's activities, events and giving."),
  office: ui.office,
  address: l("주소", "地址", "Address"),
  directions: l("길 찾기 ↗", "查看路线 ↗", "Directions ↗"),
  phone: l("전화", "电话", "Phone"),
  mobile: l("휴대전화", "手机", "Mobile"),
  email: l("이메일", "邮箱", "Email"),
  formTitle: l("메시지 남기기", "留言", "Send a message"),
  name: l("이름", "姓名", "Name"),
  reach: l("전화번호 또는 이메일", "电话或邮箱", "Phone or email"),
  message: l("문의 내용", "咨询内容", "Message"),
  required: l("(필수)", "（必填）", "(required)"),
  errName: l("이름을 입력해 주세요.", "请填写姓名。", "Please enter your name."),
  errReach: l("연락받으실 전화번호나 이메일을 입력해 주세요.", "请填写可以联系到您的电话或邮箱。", "Please enter a phone number or email where we can reach you."),
  errMessage: l("문의 내용을 5자 이상 적어 주세요.", "请至少填写5个字的咨询内容。", "Please write at least 5 characters."),
  send: l("메일로 보내기", "通过邮件发送", "Send by email"),
  helper: l("보내기를 누르면 메일 앱이 열리고 {email}로 보낼 내용이 채워집니다.", "点击发送后会打开邮件应用，并填好发往 {email} 的内容。", "Pressing send opens your mail app with a message to {email} filled in."),
  sent: l("메일 앱이 열렸습니다. 보내기를 누르면 {email}로 전달됩니다. 열리지 않으면 이메일로 직접 보내 주세요.", "已打开邮件应用。点击发送后将发给 {email}。若未打开，请直接发送邮件。", "Your mail app should have opened. Press send to deliver it to {email}. If it didn't open, please email us directly."),
  subject: l("[웹사이트 문의]", "[网站咨询]", "[Website inquiry]"),
  bodyName: l("이름", "姓名", "Name"),
  bodyReach: l("연락처", "联系方式", "Contact"),
}

export const donatePage = {
  kicker: l("후원하기 · Support", "捐赠支持 · Support", "Support"),
  title: l("협회의 활동을 함께 만들어 주세요", "与我们一起成就协会的事业", "Help us build this work"),
  lead: l("후원은 동포 사회의 모임과 교육, 서로 돕는 일에 쓰입니다.", "捐赠将用于同胞社区的聚会、教育与互助。", "Support goes to community gatherings, education and mutual aid."),
  usesTitle: l("후원금은 이런 일에 쓰입니다", "捐赠将用于这些事情", "What your support funds"),
  uses: [
    { t: l("문화 행사", "文化活动", "Cultural events"), d: l("설날, 추석 같은 전통 명절 행사와 문화 교류 프로그램", "春节、中秋等传统节日活动与文化交流项目", "Seollal and Chuseok holiday events and cultural exchange programs") },
    { t: l("차세대 교육", "下一代教育", "Next-generation education"), d: l("젊은 세대를 위한 교육 프로그램과 멘토링", "面向年轻一代的教育项目与导师指导", "Education programs and mentoring for young people") },
    { t: l("동포 지원", "同胞支持", "Community support"), d: l("세미나와 워크숍, 그리고 Moduja.com 포털 운영", "讲座与工作坊，以及 Moduja.com 门户网站的运营", "Seminars, workshops, and running the Moduja.com portal") },
  ],
  howTitle: l("후원 방법", "捐赠方式", "How to give"),
  how: l("후원 방법은 협회로 직접 문의해 주세요. 전화나 이메일로 연락 주시면 안내해 드립니다.", "请直接联系协会了解捐赠方式。通过电话或邮件联系我们，我们会为您说明。", "Please contact the association directly about how to give. Call or email us and we will walk you through it."),
  call: l("전화", "致电", "Call"),
  mail: l("이메일 보내기", "发送邮件", "Send an email"),
  mailSubject: l("후원 문의", "捐赠咨询", "Donation inquiry"),
}

export const notFound = {
  title: l("찾으시는 페이지가 없습니다", "找不到您要的页面", "We can't find that page"),
  lead: l("주소가 바뀌었거나 사라진 페이지입니다. 홈에서 다시 찾아보세요.", "该页面的地址已变更或已被移除。请从首页重新查找。", "The page may have moved or been removed. Try starting from the home page."),
  home: l("홈으로", "返回首页", "Home"),
}
