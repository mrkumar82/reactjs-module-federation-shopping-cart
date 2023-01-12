const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: 'https://reactjs-mf-shopping-cart.netlify.app/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults"
              }],
              '@babel/preset-react'
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }]
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      remotes: {
        header: 'header@https://reactjs-mf-shopping-cart-header.netlify.app/remoteEntry.js',
        footer: 'header@https://reactjs-mf-shopping-cart-header.netlify.app/remoteEntry.js',
        products: 'products@https://reactjs-mf-shopping-cart-products.netlify.app/remoteEntry.js',
        store: 'store@https://reactjs-mf-shopping-cart-store.netlify.app/remoteEntry.js',
        cart: 'cart@https://reactjs-mf-shopping-cart-store.netlify.app/remoteEntry.js',
        pdp: 'pdp@https://reactjs-mf-shopping-cart-pdp.netlify.app/remoteEntry.js',
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps['react-router-dom'],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
