
const path = require("path");
const WebpackBar = require("webpackbar");

const Proxy = require("./proxy");

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
        proxy: Proxy
    },
    eslint: {
        enable: false
    }
};