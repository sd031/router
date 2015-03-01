Package.describe({
  name: "hybrid:router",
  summary: "Simple extendable router that works with state based and url routing",
  version: "0.0.3",
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
