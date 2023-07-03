const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "VinylVibes",
    themeColor: "#f81a55"
  }
})
