require('./app/polyfills').polyfill();
require('./app/bootstrap')
  .bootstrap()
  .catch((e) => console.error('bootstrapping error', e));
