const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-docs-button-mdx": hot(preferDefault(require("/Users/account/Documents/code/office/cudy/kpi-dashboard/src/docs/Button.mdx"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz/src/pages/404.js")))
}

