switch (process.env.NODE_ENV) {
case 'production':
	module.exports = require('./build/webpack.prod.config');
	break;
default:
	module.exports = require('./build/webpack.dev.config');
}
