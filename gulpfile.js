// Importa las funciones src, dest y watch de Gulp.
const { src, dest, watch } = require("gulp");
// Importa gulp-sass y lo configura con el módulo sass.
const sass = require("gulp-sass")(require("sass"));
// Importa gulp-plumber para manejar errores durante la compilación.
const plumber = require('gulp-plumber');

// Define la función css que compila archivos SASS a CSS.
function css(done){
  // Selecciona todos los archivos SASS dentro de src/scss/ y sus subdirectorios.
  src("src/scss/**/*.scss")
    .pipe(plumber()) // Utiliza plumber para prevenir que errores detengan watch.
    .pipe(sass()) // Compila los archivos SASS a CSS.
    .pipe(dest("build/css"))  // Guarda los archivos CSS resultantes en build/css.

  done(); // Indica a Gulp que la tarea ha finalizado.
}

// Define la función dev que observa cambios en los archivos SASS.
function dev(done){
  // Observa todos los archivos SASS y ejecuta la tarea css en caso de cambios.
  watch("src/scss/**/*.scss", css)

  done(); // Indica a Gulp que la tarea ha finalizado.
}

// Exporta las tareas css y dev para que puedan ser ejecutadas desde la línea de comandos.
exports.css = css;
exports.dev = dev;
