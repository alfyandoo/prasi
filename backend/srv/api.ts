export const apiDefinition = [
  await import("./api/_prasi"),
  await import("./api/_cprasi"),
  await import("./api/_dbs"),
  await import("./api/_proxy"),
  await import("./api/comp-load"),
  await import("./api/comp-img"),
  await import("./api/comp-ext"),
  await import("./api/comp-history"),
  await import("./api/site-prod"),
  await import("./api/page-load"),
  await import("./api/page-cache"),
  await import("./api/page-history"),
  await import("./api/auth-login"),
  await import("./api/code-history"),
];
