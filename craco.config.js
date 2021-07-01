const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#212121',
              '@secondary-color': '#212121',
              // '@component-background': '#212121',
              '@alert-warning-bg-color': '#F0C808',
              '@alert-warning-border-color': '#F1D302',
              '@warning-color': '#F0C808',
              '@error-color': '#610b00',
              '@font-size-base': '15px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
