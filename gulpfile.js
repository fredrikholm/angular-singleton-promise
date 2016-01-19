var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("uglify", function () {
    return gulp.src([
        "./dist/angular-singleton-promise.js"
    ])
    .pipe(uglify())
    .pipe(rename({extname: ".min.js"}))
    .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["uglify"]);
