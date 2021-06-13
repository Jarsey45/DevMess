const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#1DA57A',
              '@secondary-color': '#A0FAE9'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};