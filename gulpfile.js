var gulp = require("gulp");
var cssmin = require("gulp-cssmin");
var jsmin = require("gulp-uglify");
var concat = require("gulp-concat");
var htmlmin = require("gulp-htmlmin");


gulp.task("yscss", function () {
    gulp.src(["./src/**/*.css"],{
        base:"./src"
    })
        .pipe(cssmin())
        .pipe(gulp.dest("./dist"))
});
gulp.task("ysjs", function () {
    gulp.src(["./src/**/*.js"],{
        base:"./src"
    })
        .pipe(jsmin())
        .pipe(gulp.dest("./dist"))
});
gulp.task("yshtml", function () {
    gulp.src("./src/**/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true, //去空格
            removeComments: true //去注释
        }))
        .pipe(gulp.dest("./dist"))
});