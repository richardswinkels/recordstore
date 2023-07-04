const { defineConfig } = require('@vue/cli-service')
const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default;

const paths = [
  {
    path: '/',
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 1.0,
    changefreq: 'monthly'
  },
  {
    path: '/store',
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 1.0,
    changefreq: 'monthly'
  },
  {
    path: '/products/:id',
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 1.0,
    changefreq: 'monthly'
  },
  {
    path: '/news',
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 1.0,
    changefreq: 'monthly'
  },
  {
    path: '/news-article/:id',
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 1.0,
    changefreq: 'monthly'
  },
  {
    path: '/contact',
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 1.0,
    changefreq: 'monthly'
  },
  {
    path: '/cart',
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 1.0,
    changefreq: 'monthly'
  },
  {
    path: '/order',
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 1.0,
    changefreq: 'monthly'
  }
];

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "VinylVibes",
    themeColor: "#f81a55"
  },
  configureWebpack: {
    plugins: [
      new SitemapWebpackPlugin({ 
        base: 'https://recordstore.richardswinkels.nl', 
        paths,
        options: {
          lastmod: true,
        } 
      })
    ]
  }
})
