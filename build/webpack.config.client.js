// 配置webpack
const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin') //  能够生成一个HTML页面，并且在webpack编译的时候


const isDev = process.env.NODE_ENV === 'development' // 用来判断当前环境是不是开发环境

const config= {
    entry: {   // 应用入口,告诉webpack那个文件是应用入口（打包用）
        app: path.join(__dirname,'../client/app.js'),

    },
    output:{  // 指定webpack打包后的输出路径,下面这个name会取值entry里面的内容。方括号标识变量，打包完成后webpack会生成一个hash,我们把hash添加到输出的文件名后面
        filename: '[name].[hash].js', // 设置输出的文件名
        path: path.join(__dirname, '../dist'), // 文件的输出路径
        publicPath: '/public/', // 静态资源引用的路径，会加到静态资源的前面。用来区分这个资源是静态资源还是api请求过来的（就是通过加的这个publicPath的前缀来作区分），比如说要使用CDN，只要把CDN的地址写上去就行了
    }, 
    module:{ // 配置一下，让webpack识别jsx语法（因为jsx不是标准的js语法，所以webpack默认是无法识别的）
        rules: [ // rules里面可以配置很多loader 
            {
                test: /.jsx$/, // 告诉webpack要识别什么样的文件来用下面的loader进行解析。这里是一个正则表达式，表示的是以.jsx结尾的所有文件
                loader: 'babel-loader', // 官方默认的jsx编译工具。这个loader可以将一些比较新的语法比如jsx，ES6,等等，编译成ES5语法。需要安装一下这个babel-loader包，但是还得安装一个babel-core核心插件,这个是babel的核心代码
            },
            {
               test: /.js$/ , // 编译它是因为我们使用了ES6语法
               loader:'babel-loader',
               exclude:[
                   path.join(__dirname, '../node_modules')
               ]
            }
        ]
    },
    plugins:[ // 下面的这个HTMLPlugin能生成一个HTML文件（html-webpack-plugin插件的作用）， 并且在编译的时候，把上面entry里面的js文件都注入到HTML里面，执行完npm run build 之后可以看到dist下面生成了一个index.html文件，文件注入了app.xxxxx.js文件
        new HTMLPlugin({ // 在webpack中使用template.html
            template: path.join(__dirname, '../client/template.html') // 这样在dist下面生成的内容会以template.html为模板，而不用自己默认生成一个index.html
        })
    ]
}

// 如果是开发环境，有webpack启动一个服务器来进行热更新（devServer的配置属性到webpack的官方文档查询：https://webpack.js.org/configuration/dev-server）
if(isDev){
    config.entry = {
        app:[
            'react-hot-loader/patch', // 热更新代码的时候需要用到的内容
            path.join(__dirname,'../client/app.js'),
        ]
    }
    config.devServer = { 
        host: '0.0.0.0', // 表示我们可以以任何一种方式来访问，比如127.0.0.1，localhost，本机IP
        port: '8888', 
        contentBase: path.join(__dirname, '../dist'), // 服务于webpack编译出来的静态文件的
        hot: true, // 启动 hot-module-replacement
        overlay: { // 编译的过程中如果出现任何错误，让他在页面上显示出黑色背景和错误信息
            errors: true, // 只显示错误的信息，不显示warning信息

        },
        historyApiFallback:{ // historyApiFallback和publicPath是webpacl-dev-server的配置，来解决上面output中 publicPath: '/public',导致静态文件路径前加了public/从而起了webpacl-dev-server服务但在页面上找不到js的问题
            index: '/public/index.html', // 让所有404请求都返回index.html
        },
        publicPath: '/public', // webpacl-dev-server的publicpath 。访问dist下面所有的静态路径前面都要加上/public才能访问到。
         
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config