self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/_error": [
    "static/chunks/pages/_error.js"
  ],
  "/categories": [
    "static/chunks/pages/categories.js"
  ],
  "/login": [
    "static/chunks/pages/login.js"
  ],
  "/mcq": [
    "static/chunks/pages/mcq.js"
  ],
  "/register": [
    "static/chunks/pages/register.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/api/auth/[...nextauth]",
    "/categories",
    "/contact",
    "/cookie-policy",
    "/dashboard",
    "/forgot-password",
    "/login",
    "/mcq",
    "/register"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()