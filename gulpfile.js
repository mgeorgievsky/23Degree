// VARIABLES & PATHS

let fileswatch   = 'html,htm,css,js,txt,json,md,woff2', // List of files extensions for watching & hard reload (comma separated)
	imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
	fonttypes	 = 'woff,woff2,ttf,eot'		
	baseDir      = 'app', // Base directory path without «/» at the end
	distDir		 = 'dist'	// Production directory
    online       = true; // If «false» - Browsersync will work offline without internet connection

let paths = {

	scripts: {
		src: [
			baseDir + '/js/**/*.js',
			'!' + baseDir + '/js/main.js',
			'!' + baseDir + '/js/main.min.js',
			baseDir + '/js/main.js', // main.js. Always at the end
		],
		dest: baseDir + '/js',
		dist: distDir + '/js',
	},

	styles: {
		src: [
			baseDir + '/css/**/*.css',
			'!' + baseDir + '/js/main.css',
			'!' + baseDir + '/js/main.min.css',
			baseDir + '/scss/main.scss' // main.css. Always at the end
		],
		dest: baseDir + '/css',
		dist: distDir + '/css',
	},

	images: {
		src:  baseDir + '/img-src/**/*',
		dest: baseDir + '/img',
		dist: distDir + '/img',
	},

	cssOutputName: 'main.min.css',
	jsOutputName:  'main.min.js',

}

// LOGIC

const { src, dest, parallel, series, watch } = require('gulp');
const scss         = require('gulp-sass');
const cleancss     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const del          = require('del');

function browsersync() {
	browserSync.init({
		server: { baseDir: baseDir + '/' },
		notify: false,
		online: online
	})
}

function scripts() {
	return src(paths.scripts.src)
	.pipe(concat(paths.jsOutputName))
	.pipe(uglify())
	.pipe(dest(paths.scripts.dest))
	.pipe(browserSync.stream())
}

function styles() {
	return src(paths.styles.src)
	.pipe(scss())
	.pipe(concat(paths.cssOutputName))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } },/* format: 'beautify' */ }))
	.pipe(dest(paths.styles.dest))
	.pipe(browserSync.stream())
}

function images() {
	return src(paths.images.src)
	.pipe(newer(paths.images.dest))
	.pipe(imagemin())
	.pipe(dest(paths.images.dest))
}

function cleanimg() {
	return del('' + paths.images.dest + '/**/*', { force: true })
}

function cleanstyles() {
	return del(baseDir + '/css/main.min.css', { force: true })
}

function cleanscripts() {
	return del(baseDir + '/js/main.min.js', { force: true })
}

function startwatch() {
	watch(baseDir  + '/**/scss/**/*', series(cleanstyles, styles));
	watch(baseDir  + '/**/*.{' + imageswatch + '}', images);
	watch(baseDir  + '/**/*.{' + fileswatch + '}').on('change', browserSync.reload);
	watch([baseDir + '/**/*.js', '!' + paths.scripts.dest + '/*.min.js'], series(cleanscripts, scripts));
}

function build() {
	return src([baseDir + '/css/main.min.css',
				baseDir + '/js/main.min.js',
				baseDir + '/img/*',
				baseDir + '/fonts/*',
				baseDir + '/**/*.{html,htm}'], { base: './app' })
		   .pipe(dest(distDir))
}

exports.browsersync = browsersync;
exports.assets      = series(cleanimg, styles, scripts, images);
exports.styles      = series(cleanstyles, styles)
exports.scripts     = scripts;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.default     = parallel(series(cleanstyles, styles), series(cleanscripts, scripts), images, browsersync, startwatch);
exports.build 		= series(cleanimg, scripts, styles, images, build);
