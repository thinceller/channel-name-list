const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')

const defaultConfig = {
  distDir: '../../dist/functions/next',
}
module.exports = withTypescript({
  ...defaultConfig,
  ...withCSS({
    cssModules: true,
    cssLoaderOptions: {
      camelCase: true,
      namedExport: true
    },
    webpack(config, options) {
      return config
    }
  })
})
