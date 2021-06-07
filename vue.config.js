module.exports = {
    devServer: {
        proxy: 'http://localhost:3000',
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.(txt|csv)$/i,
                    use: 'raw-loader',
                },
            ],
        },
    },
};
