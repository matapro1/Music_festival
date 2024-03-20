// Importa las funciones src, dest y watch de Gulp.
const { src, dest, watch, parallel } = require('gulp');


//CSS
// Importa gulp-sass y lo configura con el módulo sass.
const sass = require("gulp-sass")(require("sass"));
// Importa gulp-plumber para manejar errores durante la compilación.
const plumber = require("gulp-plumber");
//Imágenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// Define la función css que compila archivos SASS a CSS.
function css(done){
  // Selecciona todos los archivos SASS dentro de src/scss/ y sus subdirectorios.
  src("src/scss/**/*.scss")
    .pipe(plumber()) // Utiliza plumber para prevenir que errores detengan watch.
    .pipe(sass()) // Compila los archivos SASS a CSS.
    .pipe(dest("build/css"))  // Guarda los archivos CSS resultantes en build/css.

  done(); // Indica a Gulp que la tarea ha finalizado.
}

function imagenes(done) {
  const opciones = {
      optimizationLevel: 3
  }
  src('src/img/**/*.{png,jpg}')
      .pipe( cache( imagemin(opciones) ) )
      .pipe( dest('build/img') )
  done();
}

function versionWebp( done ) {
  const opciones = {
      quality: 50
  };
  src('src/img/**/*.{png,jpg}')
      .pipe( webp(opciones) )
      .pipe( dest('build/img') )
  done();
}

function versionAvif( done ) {
  const opciones = {
      quality: 50
  };
  src('src/img/**/*.{png,jpg}')
      .pipe( avif(opciones) )
      .pipe( dest('build/img') )
  done();
}

function javascript( done ){
  src('src/js/**/*.js')
      .pipe( dest('build/js') );
  done();
}


// Define la función dev que observa cambios en los archivos SASS.
function dev(done){
  // Observa todos los archivos SASS y ejecuta la tarea css en caso de cambios.
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done(); // Indica a Gulp que la tarea ha finalizado.
}

// Exporta las tareas css y dev para que puedan ser ejecutadas desde la línea de comandos.
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes,versionWebp, versionAvif, javascript, dev);
