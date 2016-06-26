module.exports = {
  // configure a built-in compiler
  sass: {
    includePaths: [
      './',
      'src/sass'
    ]
  },
  // configure autoprefixer
  autoprefixer: {
    browsers: ['last 2 versions']
  },
  // configure html minification in production mode
  // see https://github.com/kangax/html-minifier#options-quick-reference
  htmlMinifier: {
    // ...
  }
}
