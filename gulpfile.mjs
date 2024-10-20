import gulp from 'gulp';
import sass from 'gulp-sass';
import dartSass from 'sass'; // Import Dart Sass
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

// Initialize gulp-sass with Dart Sass
const sassCompiler = sass(dartSass);

// Compile SASS to CSS
function compileSass() {
    return gulp.src('sass/**/*.scss') // Source SASS files
        .pipe(sassCompiler().on('error', sassCompiler.logError)) // Compile SASS with error logging
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'Firefox ESR'], // Browser compatibility
            cascade: false
        })) // Add vendor prefixes
        .pipe(cleanCSS({
            level: {
                1: {
                    specialComments: 0 // Remove all comments
                },
                2: {
                    mergeMedia: true, // Merge media queries
                    restructureRules: true // Optimize CSS rules
                }
            }
        })) // Minify CSS
        .pipe(gulp.dest('css')); // Output compiled CSS file
}

// Watch for SASS changes and automatically run tasks
function watchFiles() {
    gulp.watch('sass/**/*.scss', compileSass);
}

// Default Gulp task
export default gulp.series(compileSass, watchFiles);
