/*
	Gulp shik v2.3

	Илья Комичев
	shikarniy.com
*/



//	Модули
// ==============================================
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var customwatch = require('gulp-watch');
var notify = require("gulp-notify");



//	Сервер с автоперезагрузкой
// ===============================================
gulp.task('webserver', function () {
	connect.server({
		port: '8080',
		root: ['../site'],
		livereload: true
	});
});



//	Наблюдение за файлами
// ==============================================
gulp.watch(['../source/jade/_*.jade'], ['jade']);
gulp.watch(['../source/styl/common.styl'], ['stylus']);


//	Плагин gulp-watch, для обновления только измененного файла
gulp.task('customwatch', function() {
		
	//	Stylys
	customwatch(['../source/styl/*.styl', '!../source/styl/common.styl'])
		//.pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
		.pipe(plumber())
		.pipe(stylus())
		.pipe(prefix())
		.pipe(connect.reload())
		.pipe(gulp.dest('../site/css'))
	
	//	Jade
	customwatch(['../source/jade/*.jade', '!../source/jade/_*.jade'])
		//.pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('../site'))
		.pipe(connect.reload())

	// JavaScript
	customwatch('../site/js/*.js')
		.pipe(connect.reload())
})



//	Задачи
// ==============================================
// Обновление всех Stylus при изменении common
gulp.task('stylus', function () {
	gulp.src(['../source/styl/*.styl', '!../source/styl/common.styl'])
		.pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
		.pipe(stylus())
		.pipe(prefix())
		.pipe(gulp.dest('../site/css'))
		.pipe(connect.reload())
});

// Сборка всех Jade при изменении частей шаблона
gulp.task('jade', function() {
	gulp.src(['../source/jade/*.jade', '!../source/jade/_*.jade'])
		.pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('../site'))
		.pipe(connect.reload());
});



//	Запуск задач
// ==============================================
gulp.task('default', ['webserver', 'customwatch', 'jade', 'stylus']);




//	Описание
// ==============================================
/*
	Livereload task just watches (via the gulp-watch plugin) for changes in the compiled files and refreshes them in the browser.
	The custom customwatch() function allows us to just reload the changed files,
	whereas the built-in gulp.watch() command would reload all files and not just the changed ones.
*/