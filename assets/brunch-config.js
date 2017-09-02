exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: 'js/base.js',

      // To use a separate vendor.js bundle, specify two files path
      // http://brunch.io/docs/config#-files-
      // joinTo: {
      //   "js/base.js": /^js/,
      //   "js/vendor.js": /^(?!js)/
      // }
      //
      // To change the order of concatenation of files, explicitly mention here
      // order: {
      //   before: [
      //     "vendor/js/jquery-2.1.1.js",
      //     "vendor/js/bootstrap.min.js"
      //   ]
      // }
    },
    stylesheets: {
      joinTo: 'css/app.css',
    },
    templates: {
      joinTo: 'js/base.js',
    },
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/assets/static". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(static)/,
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: ['static', 'css', 'js', 'vendor'],
    // Where to compile files to
    public: '../priv/static',
  },

  // Configure your plugins
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
