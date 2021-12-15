const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
module.exports={

    entry:{
        index:"./src/index.js",
        about:"./src/about/about.js",
        photo:"./src/photo/photo.js",
        address:"./src/address/address.js",
        schedule:"./src/schedule/schedule.js",
    },

    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].js",
    },

    watch:false,

    mode:"production",
    
    plugins:[
       new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            template:"./src/index.html"
        }),

        new HtmlWebpackPlugin({
            chunks: ['about'],
            filename: 'about.html',
            template:"./src/about/about.html"
        }),

          new HtmlWebpackPlugin({
          chunks: ['address'],
          filename: 'address.html',
          template:"./src/address/address.html"
        }),

        new HtmlWebpackPlugin({
          chunks: ['photo'],
          filename: 'photo.html',
          template:"./src/photo/photo.html"
        }),

      new HtmlWebpackPlugin({
        chunks: ['schedule'],
        filename: 'schedule.html',
        template:"./src/schedule/schedule.html"
      }),

      new CopyPlugin({
        patterns:[
          {from:"./src/favicon.ico", to:path.resolve(__dirname,"dist"),},
        ]
      }),


        new MiniCssExtractPlugin()
    ],

    module: {
          rules: [
            {
              test: /\.(sa|sc|c)ss$/,
              use: [MiniCssExtractPlugin.loader,{ loader:"css-loader", options:{url:true} },"postcss-loader","sass-loader"],
            },

            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',
            },

              {
                test: /(rsp-)\w+.(jpg)$/i,
                use: {
                  loader: "responsive-loader",
                  options:{
                      name:"[name][width].[ext]"
                  }
                },
              },

            {
                test: /(img-)\w+.(jpg|svg)$/i,
                loader: 'file-loader',
                   options: {
                     name: '[path][name].[ext]',
                   },

            },           
           ],
    },

    watch:true,

    optimization: {
      runtimeChunk: 'single',
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(), 
          new TerserPlugin(),
        ],

    },

    devServer:{
        allowedHosts: 'all',
        port: 9000,
        hot:true,
    },

}