/// <binding BeforeBuild='clean, min, sass' />
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var project = require("./project.json");

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

// where to find sass code
paths.sassSource = paths.webroot + "lib/foundation-sites/scss/foundation.scss";

// where to output compiled CSS code
paths.cssOutput = paths.webroot + "/css";

// where to find bower resources
paths.bower_components = paths.webroot + "lib/";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
      .pipe(concat(paths.concatJsDest))
      .pipe(uglify())
      .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
      .pipe(concat(paths.concatCssDest))
      .pipe(cssmin())
      .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task("sass", function () {
    return gulp.src(paths.sassSource)
        .pipe(sass({
            includePaths: [
                paths.bower_components + "foundation-sites/scss",
                paths.bower_components + "motion-ui/src"
            ]
        }).on("error", sass.logError))
        .pipe(gulp.dest(paths.webroot + "/css"));
});

gulp.task("sass2", function () {
    return gulp.src("Styles/main2.scss")
      .pipe(sass())
      .pipe(gulp.dest(paths.webroot + "/css"));
});