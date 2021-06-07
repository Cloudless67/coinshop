const path = require('path');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
};

module.exports = {
    configureWebpack: {
        plugins: [
            new PurgecssPlugin({
                paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
            }),
        ],
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
