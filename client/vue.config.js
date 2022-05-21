const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    host: 'hexgrid.uberfordogs.com',
  },
  lintOnSave: false,
  transpileDependencies: true
})
