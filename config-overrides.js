/**
 * Para poder cambiar los estilos de ant design debemos hacer rewiring
 * de react:
 * 
 * npm install react-app-rewired babel-plugin-import react-app-rewire-less --save-dev
 * 
 * de acuerdo a la documentacion oficial de Ant Design
 */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      '@primary-color': '#3cada9' ,
      '@body-background': '#303a46',
      "@layout-content-background": "#303a46",
      "@layout-header-background": "#303a46",
      "@layout-footer-background": "#303a46"
  },
    })
);
  


