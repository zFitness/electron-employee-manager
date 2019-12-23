const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    devServer: {
        //配置 npm run serve 运行选项
        host: '0.0.0.0',
        port: 8080
    },
    chainWebpack: config => {
        //路径别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('src', resolve('src'))
            .set('components', resolve('src/components'));
    },
    //
    pluginOptions: {
        win: {
            //设置应用图标
            icon: './public/bilibili.png'
        },
        mac: {
            //设置应用图标
            icon: './public/favicon.ico'
        },
        productName: '管理系统'
    }

}