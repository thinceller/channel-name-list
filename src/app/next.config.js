const withTypescript = require('@zeit/next-typescript')

const defaultConfig = {
  distDir: '../../dist/functions/next',
}
module.exports = withTypescript({
  ...defaultConfig,
})
