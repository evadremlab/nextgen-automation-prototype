module.exports = {
  options: {
    livereload: true
  },
  scripts: {
    files: ['js/**/*.js', 'tests/unit/**/*.js'],
    tasks: ['jshint:app', 'karma:unit', 'ngdocs']
  },
  styles: {
    files: ['styles/**/*.less'],
    tasks: ['less:css', 'autoprefixer:css']
  },
  html: {
    files: ['index.html']
  },
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  }
};
