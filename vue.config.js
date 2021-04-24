module.exports = {
  devServer: {
    proxy: {
      '/login/oauth/*': {
        target: 'https://github.com/login/oauth',
        pathRewrite: { '^/login/oauth': '' },
        changeOrigin : true,
      },
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: { '^/api': '' },
        changeOrigin : true
      },
    },
  },
};
