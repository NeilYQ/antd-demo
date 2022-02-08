
const path = require("path");
const WebpackBar = require("webpackbar")

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve("src")
        },
        plugins: [
            new WebpackBar()
        ]
    }
};