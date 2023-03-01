export const LOCALHOST_GEO_DATA = {
  city: "San Francisco",
  region: "CA",
  country: "US",
  latitude: "37.7695",
  longitude: "-122.385",
};

export const INTERVALS = [
  {
    display: "最近一小时",
    slug: "1h",
  },
  {
    display: "最近一天",
    slug: "24h",
  },
  {
    display: "最近 7 天",
    slug: "7d",
  },
  {
    display: "最近 30 天",
    slug: "30d",
  },
  {
    display: "最近 3 个月",
    slug: "90d",
  },
];

export const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring" } },
};

export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export const SWIPE_REVEAL_ANIMATION_SETTINGS = {
  initial: { height: 0 },
  animate: { height: "auto" },
  exit: { height: 0 },
  transition: { duration: 0.2, bounce: 0 },
};

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const HOME_HOSTNAMES = new Set([
  // comment for better diffs
  "home.l0l.ink",
  "localhost",
  "preview.l0l.ink",
  "localhost:3000"
]);

export const RESERVED_KEYS = new Set([
  "api",
  "va",
  "static",
  "stats",
  "proxy",
  "auth",
  "pricing",
  "about",
  "metatags",
  "blog",
  "careers",
  "docs",
  "features",
  "contact",
  "terms",
  "privacy",
  "admin",
  "help",
  "new",
  "info",
  "demo",
]);
export const DEFAULT_REDIRECTS = {
  home: "https://l0l.ink",
  signin: "https://app.l0l.ink/login",
  login: "https://app.l0l.ink/login",
  register: "https://app.l0l.ink/register",
  signup: "https://app.l0l.ink/register",
  app: "https://app.l0l.ink",
  dashboard: "https://app.l0l.ink",
  links: "https://app.l0l.ink/links",
  settings: "https://app.l0l.ink/settings",
  welcome: "https://app.l0l.ink/welcome",
  slack: "https://dub.slack.com",
  discord: "https://twitter.com/dubdotsh", // placeholder for now
};

export const FREE_PLAN_PROJECT_LIMIT = 5;
export const FAVICON_FOLDER = "/_static/favicons";
export { default as COUNTRIES } from "./countries";
export { default as ccTLDs } from "./cctlds";

export const SECOND_LEVEL_DOMAINS = new Set([
  "com",
  "co",
  "net",
  "org",
  "edu",
  "gov",
  "in",
]);

export const SPECIAL_APEX_DOMAINS = {
  "youtu.be": "youtube.com",
};

export const DEFAULT_LINK_PROPS = {
  key: "github",
  url: "https://github.com/steven-tey/dub",
  domain: "l0l.ink",
  archived: false,
  expiresAt: null,
  password: null,

  title: null,
  description: null,
  image: null,
  ios: null,
  android: null,

  clicks: 0,
  userId: "",
  createdAt: new Date(),

  proxy: false,
};
