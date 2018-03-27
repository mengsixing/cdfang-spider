var serverDomain='http://localhost:3333';
if(process.env.NODE_ENV=='production'){
	serverDomain='http://yinhengli.com:3333';
}

var config={
	serverDomain
};


export default config;
