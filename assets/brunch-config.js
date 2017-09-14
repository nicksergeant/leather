exports.config = {
  files: {
    javascripts: {
      joinTo: 'js/base.js',
    },
    stylesheets: {
      joinTo: 'css/app.css',
    },
    templates: {
      joinTo: 'js/base.js',
    },
  },
  conventions: {
    assets: /^(static)/,
  },
  paths: {
    watched: ['static', 'css', 'js', 'less', 'vendor'],
    public: '../priv/static',
  },
  plugins: {
    babel: {
      ignore: [/vendor/],
      presets: ['react', 'env'],
      plugins: ['transform-object-rest-spread'],
    },
  },
  modules: {
    autoRequire: {
      'js/base.js': ['js/base'],
    },
  },
  npm: {
    enabled: true,
    whitelist: [
      'history',
      'phoenix',
      'phoenix_html',
      'raven-js',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk',
    ],
  },
};
