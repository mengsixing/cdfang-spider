var serverDomain = 'http://localhost:8082';
if (process.env.NODE_ENV == 'production') {
	serverDomain = 'http://47.107.177.146:8082';
}

var config = {
	serverDomain
};

export default config;
