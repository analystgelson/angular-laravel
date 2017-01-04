var elixir = require('laravel-elixir');
var liveReload = require('gulp-livereload');
var clean = require('rimraf');
var gulp = require('gulp');
var concat = require('gulp-concat');

var config ={
    assets_path:'./resources/assets',
    build_path:'./public/build'
};

config.bower_path = config.assets_path +'/../bower_components';

config.build_path_js = config.build_path + '/js';
config.build_vendor_path_js = config.build_path_js + '/vendor';
config.vendor_path_js = [
    config.bower_path + '/jquery/dist/jquery.min.js',
    config.bower_path + '/bootstrap/dist/js/bootstrap.min.js',
    config.bower_path + '/angular/angular.min.js',
    config.bower_path + '/angular-route/angular-route.min.js',
    config.bower_path + '/angular-resource/angular-resource.min.js',
    config.bower_path + '/angular-animate/angular-animate.min.js',
    config.bower_path + '/angular-messages/angular-messages.min.js',
    config.bower_path + '/angular-bootstrap/ui-bootstrap.min.js',
    config.bower_path + '/angular-strap/dist/modules/navbar.min.js',
    // config.bower_path + '/angular-cookies/angular-cookies.min.js',
    // config.bower_path + '/query-string/query-string.js',
    // config.bower_path + '/angular-oauth2/dist/angular-oauth2.min.js',
    // config.bower_path + '/ng-file-upload/ng-file-upload.min.js',
    // config.bower_path + '/angular-i18n/angular-locale_pt-br.js',
    // config.bower_path + '/angular-http-auth/src/http-auth-interceptor.js',
    // config.bower_path + '/angularUtils-pagination/dirPagination.js',
    // config.bower_path + '/pusher/dist/pusher.min.js',
    // config.bower_path + '/pusher-angular/lib/pusher-angular.min.js',
    // config.bower_path + '/angular-ui-notification/dist/angular-ui-notification.min.js',
    // config.bower_path + '/blob-util/dist/blob-util.min.js'
];

config.build_path_css = config.build_path + '/css';
config.build_vendor_path_css = config.build_path_css + '/vendor';
config.vendor_path_css = [
    config.bower_path + '/bootstrap/dist/css/bootstrap.min.css',
    config.bower_path + '/bootstrap/dist/css/bootstrap-theme.min.css',
    //config.bower_path + '/angular-ui-notification/dist/angular-ui-notification.min.css'
];

config.build_path_html = config.build_path + '/views';
// config.build_path_font = config.build_path + '/fonts';
// config.build_path_image = config.build_path + '/images';
//
// gulp.task('copy-font', function(){
//     gulp.src([
//         config.assets_path + '/fonts/**/*'
//     ])
//         .pipe(gulp.dest(config.build_path_font))
//         .pipe(liveReload());
// });
//
// gulp.task('copy-image', function(){
//     gulp.src([
//         config.assets_path + '/images/**/*'
//     ])
//         .pipe(gulp.dest(config.build_path_image))
//         .pipe(liveReload());
// });


gulp.task('copy-html', function(){
    gulp.src([
        config.assets_path + '/js/views/**/*.html'
    ])
        .pipe(gulp.dest(config.build_path_html))
        .pipe(liveReload());
});

gulp.task('copy-styles', function(){
    gulp.src([
        config.assets_path + '/css/**/*.css'
    ])
        .pipe(gulp.dest(config.build_path_css))
        .pipe(liveReload());

    gulp.src(config.vendor_path_css)
        .pipe(gulp.dest(config.build_vendor_path_css))
        .pipe(liveReload());
});

gulp.task('copy-scripts', function(){
    gulp.src([
        config.assets_path + '/js/**/*.js'
    ])
        .pipe(gulp.dest(config.build_path_js))
        .pipe(liveReload());

    gulp.src(config.vendor_path_js)
        .pipe(gulp.dest(config.build_vendor_path_js))
        .pipe(liveReload());
});

gulp.task('clear-build-folder', function(){
    clean.sync(config.build_path);
});

var js = [
    './resources/assets/../bower_components/jquery/dist/jquery.min.js',
    './resources/assets/../bower_components/bootstrap/dist/js/bootstrap.min.js',
    './resources/assets/../bower_components/angular/angular.min.js',
    './resources/assets/../bower_components/angular-route/angular-route.min.js',
    './resources/assets/../bower_components/angular-resource/angular-resource.min.js',
    './resources/assets/../bower_components/angular-animate/angular-animate.min.js',
    './resources/assets/../bower_components/angular-messages/angular-messages.min.js',
    './resources/assets/../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    './resources/assets/../bower_components/angular-strap/dist/modules/navbar.min.js'
];

var css = [
    './resources/assets/../bower_components/bootstrap/dist/css/bootstrap.min.css',
    './resources/assets/../bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
];

gulp.task('default',['clear-build-folder'], function(){
    gulp.start('copy-html');
    gulp.src(js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/js/'));
    gulp.src(css)
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch-dev',['clear-build-folder'], function(){
    liveReload.listen();
    gulp.start('copy-styles', 'copy-scripts', 'copy-html');
    gulp.watch(config.assets_path + '/**', [
        'copy-styles', 'copy-scripts', 'copy-html'
    ]);
});