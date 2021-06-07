module.exports = {
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
