chainWebpack: config => {
    config.module
        .rule('less')
        .use('less-loader')
        .loader('less-loader')
        .options({
            lessOptions: {
                strictMath: true,
                noIeCompat: true
            }
        })
}