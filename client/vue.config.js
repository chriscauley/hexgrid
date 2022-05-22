const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    host: 'hexgrid.uberfordogs.com',
  },
  lintOnSave: false,
  transpileDependencies: true,
})


if (process.env.NODE_ENV === 'production') {
  module.exports.publicPath = '/hexgrid/'
}