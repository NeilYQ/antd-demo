
const path = require("path");
const WebpackBar = require("webpackbar")


module.exports = {
    webpack: {
        alias: {
            '@': path.resolve("src")
        },
        plugins: [
            new WebpackBar()
        ],
    },
    devServer: {
        port: 8000, // 端口配置
        proxy: {
            '/api': {
                target: 'http://120.78.88.126:10050',
                pathRewrite: { '^': '' },
                changeOrigin: true,
            } 
        } 
    }
};