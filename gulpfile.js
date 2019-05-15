const gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	htmlmin = require('gulp-htmlmin'),//压缩html
	imagemin = require('gulp-imagemin'),//压缩图片
	pngcrush = require('imagemin-pngcrush'),
	cleancss = require('gulp-clean-css'),//压缩CSS
	jshint = require('gulp-jshint'),//检测js
	babel = require('gulp-babel'),//es6转es5
	uglify = require('gulp-uglify'),//压缩js
	concat = require('gulp-concat'),//合并
	rename = require('gulp-rename'),//重命名
	notify = require('gulp-notify');//更改提醒
	
//es6转es5
gulp.task('es5',function(){
	gulp.src('./src/js/*.js')
	.pipe(babel({presets: ['@babel/env']}))
	.pipe(gulp.dest('./src/es5js'));
});	
//压缩js
gulp.task('js', function(){
	gulp.src('./src/es5js/*.js')
	.pipe(uglify())
	.pipe(rename({'suffix':'.min'}))
	.pipe(gulp.dest('dist/js'))
	.pipe(notify({message: 'js task ok'}));
});
//压缩图片
gulp.task('img',function(){
	gulp.src('./img/*.*')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/img'));
});
//编译sass压缩css
gulp.task('sass',function(){
	gulp.src('./src/sass/*.scss')
	.pipe(sass())
	.pipe(cssnano())
	.pipe(rename({'suffix':'.min'}))
	.pipe(gulp.dest('./dist/css'));
});
