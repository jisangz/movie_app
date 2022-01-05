const path = require('path')
const Htmlplugin = require('html-webpack-plugin')
const Copyplugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const Dotenv = require('dotenv-webpack')

module.exports = {
    resolve:{
      extensions : ['.js','.vue','.scss'],
      alias:{
        '~':path.resolve(__dirname,'src'),
        'assets':path.resolve(__dirname,'src/assets')
      }
    },
    entry:'./src/main.js',
    output:{
        // path: path.resolve(__dirname,'dist') ,
        // filename:'main.js'
        clean: true
    },
    module:{
      rules:[
        {
          test:/\.vue$/,
          use:'vue-loader',
        },
        {
          test:/\.s?css$/,
          use:[
            //순서 중요
            //'vue-style-loader',
            'style-loader',
            'css-loader',
            'postcss-loader',
            // 'sass-loader'
            {
              loader:'sass-loader',
              options:{
                //공통 항목을 선언해줄수 있다
                additionalData:'@import "~/scss/main";'
              }
            }
          ]
        },
        {
          test:/\.js$/,
          exclude:/node_modules/, // 제외할 항목
          use:[
            'babel-loader',
          ]
        },
        {
          test:/\.(png|jpe?g|gif|webp)$/,
          use:[
            'file-loader',
          ]
        },
        
      ]
    },
    plugins:[
        new Htmlplugin({
            template:'./index.html'
        }),
        new Copyplugin({
            patterns:[
                { from :'src' }
            ]
        }),
        new VueLoaderPlugin(),
        new Dotenv()
    ],
    devServer:{
        host:'localhost',
        port: 8079
    }
}