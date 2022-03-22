const path = require('path')
function resolve(dir) {
    // console.log(dir);
    return path.join(__dirname, dir);
}
const c = {
    devServer: {
      port: 8080,
      https: false,
      proxy: {
        '/api':{
            target: 'http://127.0.0.1:8181/',
            ws: true,
            changeOrigin: true,
        },
        '/public':{
            target: 'http://127.0.0.1:8181/',
            ws: true,
            changeOrigin: true,
        }
      },
    },
    pages:{
      index: {
          entry: 'src/pages/index/main.js',
          template: 'public/index.html',
          filename: 'index.html'
      },
        // login: {
        //     entry: 'src/pages/login/main.js',
        //     template: 'public/index.html',
        //     filename: 'login.html'
        // },
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@components': resolve('src/components'),
                '@assets':resolve('src/assets'),
                '@': resolve('src'),
                'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
            }
        },
    },
    css:{
        loaderOptions: {
            sass: {
                additionalData:`@import "./src/assets/scss/style.scss";`
            }
        }
    },
    chainWebpack: config => {
        config.plugin('define').tap(args=>{
            const argv = process.argv
            const icourt = argv[argv.indexOf('--icourt-mode') + 1]
            args[0]['process.env'].MODE = `"${icourt}"`
            return args
        })
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule.exclude.add(/noe_modules/)
        svgRule
            .test(/\.svg/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        const imagesRule = config.module.rule('images')
        imagesRule.exclude.add(resolve('src/icons'))
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

    }
}
module.exports = c;
