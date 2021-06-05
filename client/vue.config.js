module.exports = {
    outputDir: '../server/app/',
    publicPath: process.env.NODE_ENV === 'production' ? '/app/' : '/',
    devServer: {
        proxy: 'http://localhost:3000',
    },
};
