module.exports = {
  files: {
    javascripts: {
      joinTo: 'app.js'
    },
    stylesheets: {joinTo: 'app.css'}
  },

  plugins: {
    babel: {
      presets: ["@babel/preset-react", "@babel/preset-env"],
      plugins: ['syntax-object-rest-spread',  '@babel/plugin-syntax-class-properties', '@babel/plugin-proposal-class-properties']
    },

    postcss: {
      processors: [
        require('autoprefixer')
      ]
    }
  }
};
