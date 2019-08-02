const { merge } = require('lodash/fp')

let custom
try {
  custom = require('./gatsby-config.custom')
} catch (err) {
  custom = {}
}

const config = {
  siteMetadata: {
    title: 'Kpi Dashboard',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: '/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz',
        base: '/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        ignore: [{}, {}, {}, {}, {}],
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Kpi Dashboard',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        themeConfig: {},
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        paths: {
          root: '/Users/account/Documents/code/office/cudy/kpi-dashboard',
          templates:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/node_modules/docz-core/dist/templates',
          packageJson:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/package.json',
          docz: '/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz',
          cache:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz/.cache',
          app:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz/app',
          appPublic:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz/public',
          appNodeModules:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/node_modules',
          appPackageJson:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/package.json',
          appYarnLock:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/node_modules/docz-core/yarn.lock',
          ownNodeModules:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/node_modules/docz-core/node_modules',
          gatsbyConfig:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/gatsby-config.js',
          gatsbyBrowser:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/gatsby-browser.js',
          gatsbyNode:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/gatsby-node.js',
          gatsbySSR:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/gatsby-ssr.js',
          importsJs:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz/app/imports.js',
          rootJs:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz/app/root.jsx',
          indexJs:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz/app/index.jsx',
          indexHtml:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz/app/index.html',
          db:
            '/Users/account/Documents/code/office/cudy/kpi-dashboard/.docz/app/db.json',
        },
      },
    },
  ],
}

module.exports = merge(config, custom)
