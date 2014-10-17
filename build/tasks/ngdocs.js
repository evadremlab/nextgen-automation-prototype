module.exports = {
  options: {
    dest: './docs',
    html5Mode: true,
    title: 'nextgen-automation',
    titleLink: '/docs/api',
    startPage: '/api',
    bestMatch: true
  },
  all: {
    src: ['./js/console/services/*.js']
  }
};
