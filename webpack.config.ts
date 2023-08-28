const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
   mode: process.env.NODE_ENV || 'development',
   resolve: {
      extensions: ['.jsx', '.js', '.tsx', '.ts'],
    },
   // where to entire file system
   entry: path.resolve(__dirname, 'src/index.tsx'),
   // where to output bundle
   output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    //only keeps one bundle file
    clean: true,
    // make the build have the same image name
   //  assetsModuleFilename: '[name][ext]'
   },
   // helps with debugging
   devtool: 'source-map',
   devServer: {
      static: {
         directory: path.resolve(__dirname, 'dist')
      },
      host: '127.0.0.1',
      //front end
      port: 8080,
      // npm run dev will open the browser automatically
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
      proxy: {
         //when it goes to this path, go to the local host
         '/api': 'http://localhost:3000/',
       },
   },
   module: {
      rules: [
         // any file that ends with this extension
         {
            test: /.(css|scss)$/,
            use: [
               'style-loader',
               'css-loader',
               'sass-loader'
            ]
         },
         {
            // backwards compatible for older browsers
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env','@babel/preset-react']
               }
            }
         },
         {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: ['ts-loader'],
          },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
         }
      ]
   },
   plugins: [
      // we want our bundle.js file to be loaded into an HTMl file
      new HTMLWebpackPlugin({
         title: 'TacoEveryday',
         filename: 'index.html',
         template: 'src/index.html'
      })
   ]
}