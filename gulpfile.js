const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const fontmin = require('gulp-fontmin');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync');

gulp.task('sass', function(){ 
  return gulp.src('app/scss/**/*.scss') 
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))      
    .pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 9', 'ie 10'], { cascade: true })) 
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css')) 
    .pipe(browserSync.reload({stream: true})) 
});

gulp.task('javacomp', function () {
  return pipeline(
        gulp.src('app/js/*.js'),
        uglify(),
        gulp.dest('dist/js')
  );
});

gulp.task('fontminn', function (text) {
    return gulp.src('app/fonts/*')
        .pipe(fontmin({
           text:text
        }))
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('htmlminff', () => {
  return gulp.src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('imggg', () =>
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('cssmins', function () {
	return gulp.src('app/css/*.css')
           .pipe(cssmin())
           .pipe(gulp.dest('dist/css'));
});

gulp.task('build', gulp.series('htmlminff','cssmins','imggg','javacomp','fontminn', function() {   
}));