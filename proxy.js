
const proxy = {
    '/api': {
        target: 'http://120.78.88.126:10050',
        pathRewrite: { '^': '' },
        changeOrigin: true,
    } 
};

module.exports = proxy;