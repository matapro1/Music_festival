const { src, dest, watch } = require("gulp"); // Aquí estás importando las funciones necesarias de Gulp y el módulo gulp-sass.
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');

function css(done){ //toma el archivo SASS, lo compila a CSS y lo guarda en la carpeta 
  src("src/scss/**/*.scss") // Identificar el archivo SASS
    .pipe(plumber())
    .pipe(sass()) // Compilarlo
    .pipe(dest("build/css"))  // Almacenarlo en el disco duro


  done(); //Callback que avisa a gulp cuando llegamos al final
}


function dev(done){ //utiliza la función watch de Gulp para observar cambios en el archivo SASS. Cuando se detecta un cambio, se ejecuta la tarea css.
  watch("src/scss/**/*.scss", css)


  done()
}
exports.css =css;
exports.dev = dev; //Aquí estás exportando las tareas css y dev para que puedan ser ejecutadas desde la línea de comandos con gulp css y gulp dev, respectivamente.