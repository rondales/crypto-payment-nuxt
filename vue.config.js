module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule
      .oneOf('component')
      .resourceQuery(/component/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            {
              cleanupIDs: false
            }
          ]
        }
      })
      .end()
      .end()
    svgRule.oneOf('normal').uses.merge(svgRule.uses.entries())
    svgRule.uses.clear()
  }
}
