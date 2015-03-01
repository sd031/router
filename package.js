Package.describe({
  name: "hybrid:router",
  summary: "Simple extendable router with state and url based routing and built in history",
  version: "0.0.5",
  git: "https://github.com/meteorhybrid/router"
});

Package.onUse(function(api) {
  api.export('Router');
  api.versionsFrom('METEOR@1.0');

  api.use([
    'templating', 
    'blaze', 
    'underscore'
  ])

  api.use('bigdata:logs@1.0.2');

  api.addFiles([
    'router.html',
    'router.js',
    'layout.js'
  ], 'client');
});
