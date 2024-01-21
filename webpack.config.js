import Dotenv from "dotenv-webpack"
import path from "path"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import webpack from "webpack"
import FaviconsWebpackPlugin from "favicons-webpack-plugin"
// const SitemapPlugin = require('sitemap-webpack-plugin').default;
import sitemap from "sitemap-webpack-plugin"
var SitemapPlugin = sitemap.default;

// sitemap paths
const paths = [
  '/',
  '/download/',
  '/info/',
  '/install/'
];

export default {
  // Define the entry points of our application (can be multiple for different sections of a website)
  entry: {
    main: "./src/js/main.js",
  },

  // Define the destination directory and filenames of compiled resources
  output: {
    filename: "js/[name].js",
    path: path.resolve(process.cwd(), "./public"),
  },

  // Define development options
  devtool: "source-map",

  // Define loaders
  module: {
    rules: [
      // Use handlebars js for templating
      { 
        test: /\.hbs$/, 
        loader: "handlebars-loader" 
      },
      // Use babel for JS files
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env"
            ]
          }
        }
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
              url: false,
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer",
                ]
              }
            }
          },
          "sass-loader"
        ],
      },
      // File loader for images
      {
        test: /\.(jpg|jpeg|png|git|svg)$/i,
        type: "asset/resource",
      }
    ],
  },

  // Define used plugins
  plugins: [
    // Load .env file for environment variables in JS
    new Dotenv({
      path: "./.env"
    }),

    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    }),

    // Copy images and Bootstrap Icons files to the public folder
    new CopyPlugin({
      patterns: [
        {
          from: "src/images",
          to: "images"
        },
        {
          from: './node_modules/bootstrap-icons/font/fonts', 
          to: "./fonts"
        }
      ]
    }),

    // Include jQuery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    new FaviconsWebpackPlugin({
      logo: './src/images/passgrinder-128.png',
      logoMaskable: './src/images/maskable_icon.png',
    }),

    // Inject styles and scripts into the HTML
    new HtmlWebpackPlugin({
      'meta': {
        'description': 'Generate twenty-character strong passwords from your master password and the domain name or unique phrase you choose.',
        'charset': 'utf-8',
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'x-ua-compatible': { 'http-equiv': 'x-ua-compatible', 'content': 'ie=edge' },
      },
      template: path.resolve(process.cwd(), "./src/index.hbs")
    }),

    new HtmlWebpackPlugin({
      'meta': {
        'description': 'Generate twenty-character strong passwords from your master password and the domain name or unique phrase you choose.',
        'charset': 'utf-8',
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'x-ua-compatible': { 'http-equiv': 'x-ua-compatible', 'content': 'ie=edge' },
      },
      filename: "info/index.html",
      template: path.resolve(process.cwd(), "./src/info.hbs")
    }),

    new HtmlWebpackPlugin({
      'meta': {
        'description': 'Generate twenty-character strong passwords from your master password and the domain name or unique phrase you choose.',
        'charset': 'utf-8',
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'x-ua-compatible': { 'http-equiv': 'x-ua-compatible', 'content': 'ie=edge' },
      },
      filename: "download/index.html",
      template: path.resolve(process.cwd(), "./src/download.hbs")
    }),

    new HtmlWebpackPlugin({
      'meta': {
        'description': 'Generate twenty-character strong passwords from your master password and the domain name or unique phrase you choose.',
        'charset': 'utf-8',
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'x-ua-compatible': { 'http-equiv': 'x-ua-compatible', 'content': 'ie=edge' },
      },
      filename: "install/index.html",
      template: path.resolve(process.cwd(), "./src/install.hbs")
    }),

    new HtmlWebpackPlugin({
      'meta': {
        'robots': 'noindex',
        'description': 'Generate twenty-character strong passwords from your master password and the domain name or unique phrase you choose.',
        'charset': 'utf-8',
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'x-ua-compatible': { 'http-equiv': 'x-ua-compatible', 'content': 'ie=edge' },
      },
      filename: "privacy-policy/index.html",
      template: path.resolve(process.cwd(), "./src/privacy-policy.hbs")
    }),

    // Basic usage (output defaults to sitemap.xml)
    new SitemapPlugin({ 
      base: 'https://passgrinder.com', paths 
    })

  ],

  // Configure the "webpack-dev-server" plugin
  devServer: {
    static: {
      directory: path.resolve(process.cwd(), "public")
    },
    watchFiles: [
      path.resolve(process.cwd(), "./src/index.hbs"),
      path.resolve(process.cwd(), "./src/info.hbs"),
      path.resolve(process.cwd(), "./src/download.hbs"),
      path.resolve(process.cwd(), "./src/install.hbs"),
      path.resolve(process.cwd(), "./src/contact.hbs"),
      path.resolve(process.cwd(), "./src/privacy-policy.hbs"),
      path.resolve(process.cwd(), "./src/partials/header.hbs"),
      path.resolve(process.cwd(), "./src/partials/footer.hbs")
    ],
    compress: true,
    port: process.env.PORT || 9090,
    hot: true,
  },

  // Performance configuration
  performance: {
    hints: false
  }
};
