// 配置webpack
const path = require('path')

module.exports= {
    entry: {   // 应用入口,告诉webpack那个文件是应用入口（打包用）
        app: path.join(__dirname,'../client/app.js')
    },
    output:{  // 指定webpack打包后的输出路径,下面这个name会取值entry里面的内容。方括号标识变量，打包完成后webpack会生成一个hash,我们把hash添加到输出的文件名后面
        filename: '[name].[hash].js', // 设置输出的文件名
        path: path.join(__dirname, '../dist'), // 文件的输出路径
        publicPath: '/public', // 静态资源引用的路径，会加到静态资源的前面。用来区分这个资源是静态资源还是api请求过来的（就是通过加的这个publicPath的前缀来作区分），比如说要使用CDN，只要把CDN的地址写上去就行了
    }
}