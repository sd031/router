Package.describe({
  name: "hybrid:router",
  summary: "Cross-platform, extensible router with state and url based routing and built in history",
  version: "0.0.7",
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

  api.use('bigdata:logs@1.0.4');

  api.addFiles([
    'router.html',
    'router.js',
    'layout.js'
  ], 'client');
});
