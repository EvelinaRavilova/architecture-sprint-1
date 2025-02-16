module.exports = {
  mfConfig: {
    name: "feed",
    exposes: {
      './AddCardButton': './src/components/AddCardButton.jsx',
      './CardsList': './src/components/CardsList.jsx',
    },
    shared: ["react", "react-dom"],
  }
}
