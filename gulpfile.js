const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('buildcss', () => {
	gulp.src('./src/sass/*.scss')
	return sass('./src/sass/*.scss').on('error', sass.logError)
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./src'))
});

gulp.task('default', ['buildcss']);
