/* eslint-disable global-require */
switch (process.env.NODE_ENV) {
  case 'production':
    if (process.env.BUILD_ENV === 'analysis') {
      module.exports = require('./build/webpack.analysis.config');
    } else {
      module.exports = require('./build/webpack.prod.config');
    }
    break;
  default:
    module.exports = require('./build/webpack.dev.config');
}
