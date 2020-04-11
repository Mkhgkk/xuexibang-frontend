const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#722ed1" }
  })
);

// @btn-border-radius-base: @border-radius-base;
// @btn-border-radius-sm: @border-radius-base;
