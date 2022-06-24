const path = require('path')
// A webpack plugin to remove/clean your build folder(s)
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// It creates the index.html file and includes all my scripts
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Extracts loaded styles into separate files for production use to take advantage of browser caching
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// Copies individual files or entire directories, which already exist, to the build directory
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
console.log('isDevelopment: ', isDevelopment)
console.log('isProduction: ', isProduction)

const config = {
  entry: {
    main: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@comp': path.resolve(__dirname, 'src/components')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.sass']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env', '@babel/preset-react']
          // }
        }
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          // 'style-loader' - creates `style` nodes from JS strings, during development injects loaded styles into the document at runtime
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          // 'css-loader' - translates CSS into CommonJS
          {
            loader: 'css-loader', // Parses CSS files, resolving external resources, such as images, fonts, and additional style imports
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 3 // process @import-ed files using the loaders that follow it
              // 0 => no loaders (default);
              // 1 => resolve-url-loader;
              // 2 => resolve-url-loader, sass-loader
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          "resolve-url-loader", // make relative imports work from @imported Sass files
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        // Asset Modules - https://webpack.js.org/guides/asset-modules/
        test: /\.(ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/media/[name].[hash:8][ext][query]'
        }
      },
      // {
      //   test: /\.svg$/,
      //   use: ["@svgr/webpack"]
      // },
      {
        // Asset Modules - https://webpack.js.org/guides/asset-modules/
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        },
        generator: {
          filename: 'assets/fonts/[name][hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    isProduction &&
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].chunk.css'
      }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      inject: true,
      // minify: isProduction
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/favicon.ico'),
          to: path.resolve(__dirname, 'dist/assets/media')
        }
      ]
    }),
    new CleanWebpackPlugin()
  ].filter(Boolean),
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
    client: {
      overlay: true
    }
  },
  devtool: isDevelopment ? 'inline-source-map' : 'source-map'
}

module.exports = config
