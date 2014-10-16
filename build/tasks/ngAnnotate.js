module.exports = {
  options: {
    add: false,
    remove: true,
    singleQuotes: true
  },
  app: {
    files: [
      {
        expand: true,
        src: ['js/**/*.js']
      }
    ]
  }
};