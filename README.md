全局安装gulp 用yarn global并不能使用gulp命令，使用npm add -g
1. 安装gulp-pug 处理pug
2. 安装gulp-less 处理less
3. 安装browser-sync实现修改刷新
4. 安装gulp-clean 每次构建之前清除


##### 说明
使用pug和less开发页面，可使用pug组件，运行gulp生成dist文件

- 项目文件写在src中
* components： pug组件
* libs: js
* pages: pug页面
* style：css

- 页面配置写在config.js中
 ```
 {
    page: 'index', // 页面名称， 必填
    css: ['header', 'index'], // 页面中需要合并的css，选填
    js： ['news'] // 页面中需要合并的js,选填
 }
 ```


page格式说明
```
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    title Document
    <!-- 合并的css,已页面名命名 -->
    link(type="text/css" rel="stylesheet" href="./css/index.css")
    <!-- 单独引进的css -->
    link(type="text/css" rel="stylesheet" href="./css/swiper.css")
    script(src="./js/rem.js")
  body
    include ../components/fiuger.pug
    include ../components/news.pug
    <!-- 单独引进的js -->
    script(src="./js/swiper.js")
    <!-- 合并的js,以页面名命名 -->
    script(src="./js/index.js")



```
