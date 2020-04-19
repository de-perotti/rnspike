require('./app/polyfills').polyfill();
require('./platform');
require('./app/bootstrap')
  .bootstrap()
  .catch((e) => console.error('bootstrapping error', e));
