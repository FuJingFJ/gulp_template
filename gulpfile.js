const pages = require('./config')
var gulp = require('gulp')
var pug = require('gulp-pug')
var less = require('gulp-less')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload // 重载
var clean = require('gulp-clean') // 构建前先清除
var concat = require('gulp-concat') // 合并

function getPages () {
  let arr = []
  for (let i = 0; i < pages.length; i ++) {
    arr.push(pages[i].page)
  }
  return arr
}
function getCss (css) {
  let arr = []
  for (var i = 0; i < css.length; i++) {
    arr.push(`./src/style/${css[i]}.less`)
  }
  return arr
}

function getJS (js) {
  let arr = []
  for (var i = 0; i < js.length; i++) {
    arr.push(`./src/libs/${js[i]}.js`)
  }
  return arr
}
for(var i = 0; i < pages.length; i++) {
  let page = pages[i].page
  let css = getCss(pages[i].css)
  let js = getJS(pages[i].js)
  gulp.task(page, function () {
    gulp.src(css)
    .pipe(reload({
      stream: true
    }))
    .pipe(less())
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./dist/css'))

    gulp.src(js)
    .pipe(reload({
      stream: true
    }))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/js'))
  })
}

gulp.task('pug', function () {
  gulp.src('./src/pages/*.pug')
  .pipe(pug({
    pretty: true // html不压缩
  }))
  .pipe(gulp.dest('./dist/'))
  .pipe(reload({
    stream: true
  }))
})

gulp.task('rem', function () {
  gulp.src(['./src/libs/rem.js'])
  .pipe(gulp.dest('./dist/js'))
})

gulp.task('swiperCss', function () {
  gulp.src(['./src/style/swiper.css'])
  .pipe(gulp.dest('./dist/css'))

  gulp.src(['./src/libs/swiper.js'])
  .pipe(gulp.dest('./dist/js'))
})
gulp.task('watchpug', function () {
  gulp.watch('./src/*/*.pug', ['pug'])
})
gulp.task('watchless', function () {
  gulp.watch('./src/*/*.less', [...getPages()])
})

gulp.task('browserSync', ['pug', ...getPages()], function() {
  browserSync.init({
    server: './dist',
    port: 4444
  })
  gulp.watch('./src/index.less', [...getPages()]).on('change', reload)
  gulp.watch('./src/index.pug', ['pug']).on('change', reload)
})
// 目标目录清理
gulp.task('clean', function () {
  return gulp.src(['./dist/*'])
  .pipe(clean())
})
gulp.task('default', ['clean'], function () {
  gulp.start('pug', 'watchpug', 'watchless', 'browserSync', 'rem', 'swiperCss', ...getPages())
})
