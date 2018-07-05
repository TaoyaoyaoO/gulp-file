var gulp = require('gulp');
var del = require('del');
// 常用插件
// 压缩javascript文件，减小文件大小
var uglify = require('gulp-uglify');
// 文件重命名
var rename = require('gulp-rename');   
// 压缩css
var cssmin = require('gulp-cssmin');
// 合并javascript文件，减少网络请求
var concat = require('gulp-concat');
//解析sass文件
var sass = require("gulp-sass");
// 压缩图片
var imagemin = require("gulp-imagemin");
// 压缩html
var htmlmin = require('gulp-htmlmin');
// babel es6转化为es5
var babel = require("gulp-babel");    // 用于ES6转化ES5

var connect = require('gulp-connect');

gulp.task('server', ['default', 'watch'], function() {
	connect.server({
		root: 'dist',
		port: 8080,
		livereload: true
	})
})
gulp.task('watch', function () {

  gulp.watch('blog/*.html', ['htmlmin']);
 
  gulp.watch('blog/**/*.js', ['uglify']);
});
//var livereload = require('gulp-livereload');
gulp.task('default',['cssmin', 'imagemin', 'uglify', 'htmlmin'],  function() {
  console.log('正确执行该任务')
});

gulp.task('es6', function() {
	return gulp.src('blog/es6.js')
	.pipe(babel())
	.pipe(gulp.dest('build'))
	 .pipe(connect.reload())
})
gulp.task('cssmin', function() {
  console.log('正确执行css压缩任务')
	return gulp.src('blog/**/*.css')
	.pipe(cssmin())
//	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
	return gulp.src("blog/**/*.js")
	.pipe(uglify())
//	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('dist'))
})

gulp.task('imagemin', function(){
	return gulp.src('blog/images/*')
		.pipe(imagemin({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
		.pipe(gulp.dest('dist/images'))
});


gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('blog/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'))
         .pipe(connect.reload())
});
gulp.task('clean', function(){
	del([
		'dist'
	])
})
//var watch = gulp.watch('app/index.html', ["minify"]);
//watch.on('change', function(event) {
//	console.log('File' + event.path)
//})
