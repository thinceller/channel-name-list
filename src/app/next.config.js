const path = require('path')
const withTypescript = require('@zeit/next-typescript')
const Dotenv = require('dotenv-webpack')

const defaultConfig = {
  distDir: '../../dist/functions/next',
}
module.exports = withTypescript({
  ...defaultConfig,
  webpack(config) {
    config.plugins = config.plugins || []
    config.plugins.push(new Dotenv({
      path: path.join(__dirname, '.env'),
      systemvars: true
    }))
    return config
  }
})
