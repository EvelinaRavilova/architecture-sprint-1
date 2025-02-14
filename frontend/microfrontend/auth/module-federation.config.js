module.exports = {
  mfConfig: {
    name: "auth",
    exposes: {
      './Login': './src/components/Login.jsx',
      './Register': './src/components/Register.jsx',
      './InfoTooltip': './src/components/InfoTooltip.jsx'
    },
    shared: ["react", "react-dom"],
  }
}
