const path = require("node:path")
const { defineConfig } =  require("@rspack/cli")
const { rspack } =  require("@rspack/core")
const { ModuleFederationPlugin } = require("@module-federation/enhanced/rspack")

const { mfConfig } = require("./module-federation.config")

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

module.exports = defineConfig({
  context: __dirname,
  entry: {
    main: "./src/index.js",
  },
  resolve: {
    extensions: ["...", ".js", ".jsx"],
  },

  devServer: {
    port: 8091,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
  },
  output: {
    // You need to set a unique value that is not equal to other applications
    uniqueName: "auth",
    // publicPath must be configured if using manifest
    publicPath: "http://localhost:8091/",
  },

  experiments: {
    css: true,
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css",
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude:  /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [ "@babel/preset-react"]
        }
      }
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    new ModuleFederationPlugin(mfConfig),
    null,
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
});
