const analysisConfig = require('./build/webpack.analysis.config');
const prodConfig = require('./build/webpack.prod.config');
const devConfig = require('./build/webpack.dev.config');

switch (process.env.NODE_ENV) {
  case 'production':
    if (process.env.BUILD_ENV === 'analysis') {
      module.exports = analysisConfig;
    } else {
      module.exports = prodConfig;
    }
    break;
  default:
    module.exports = devConfig;
}
