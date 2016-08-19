var sass = require("gulp-sass");
// where to find sass code
paths.sassSource = "./Scss/*.scss";

// where to output compiled CSS code
paths.cssOutput = paths.webroot + "css";

// where to find bower resources
paths.bower_components = paths.webroot + "lib/";

gulp.task('sass', function () {
    gulp.src(paths.sassSource)
        .pipe(sass({
            includePaths: [
                paths.bower_components + 'foundation-sites/scss',
                paths.bower_components + 'motion-ui/src'
            ]
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.cssOutput));
});