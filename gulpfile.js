/// <binding ProjectOpened='default, watch' />
var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-rimraf');
var plumber = require('gulp-plumber');
var webpack = require('webpack-stream');
var preprocess = require('gulp-preprocess');
var	minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

gulp.task('css', function () {
	console.log("start css");
	return gulp.src('./client/css/*.css')
		.pipe(preprocess())
		.pipe(concat('styles.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./public/css/'));
});


gulp.task('watch', function () {
	var watcher = gulp.watch(['client/*.*', 'client/css/*.*', 'client/js/*.*'], ['default']);
	watcher.on('change', function (event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
	return watcher;
});

gulp.task('clean-scripts', function () {
	return gulp.src(['public/js','public/css'], { read: false })
		.pipe(clean());
});

// gulp.task('lib', function () {
// 	return gulp.src('client/lib/*.js')
//         .pipe(gulp.dest('public/js'));
// });

gulp.task('react', function () {
	// var compileBabel = babel({
	// 	"presets": ["es2015", "react"]
	// });
	// compileBabel.on('error', function (err) {
	// 	console.info(err);
	// 	gulp.start('watch');
	// });

	return gulp.src('client/js/*.js*')
		.pipe(plumber())
		//.pipe(compileBabel)
		.pipe(webpack({
			devtool: 'source-map',
			watch: true,
			module: {
				loaders: [
					{
						test: /\.jsx?$/,
						loader: 'babel',
						exclude: /node_modules/,
						query: {
							presets: ['es2015', 'react']
						}
					}
				]
			},
			output: {
				filename: 'client.js'
			}
		}))
		.pipe(gulp.dest('public/js'));
});

gulp.task('default', ['clean-scripts'], function () {
	gulp.start('react');
	gulp.start('css');
});
