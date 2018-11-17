const qiniu = require('qiniu');
const path = require('path');
const qiniuConfig = require('./qiniu.config');

// 上传文件到七牛云
class MyQiniuUploadPlugin {
	constructor() {
		// 鉴权
		const mac = new qiniu.auth.digest.Mac(
			qiniuConfig.accessKey,
			qiniuConfig.secretKey
		);
		// 设置机房
		const options = {
			scope: qiniuConfig.bucket
		};
		// 创建上传token
		const putPolicy = new qiniu.rs.PutPolicy(options);
		this.uploadToken = putPolicy.uploadToken(mac);
		let config = new qiniu.conf.Config();
		// 空间对应的机房
		config.zone = qiniu.zone[qiniuConfig.zone];
		this.formUploader = new qiniu.form_up.FormUploader(config);
		this.putExtra = new qiniu.form_up.PutExtra();
	}
	apply(compiler) {
		compiler.hooks.compilation.tap('MyQiniuUploadPlugin', compilation => {
			this.absolutePath = compilation.outputOptions.path;
		});

		compiler.hooks.done.tapAsync('MyQiniuUploadPlugin', (data, callback) => {
			console.log('开始上传文件到七牛云...');
			Object.keys(data.compilation.assets).forEach(file => {
				if (/.js$/.test(file)) {
					this.uploadFile(file);
				}
			});
			callback();
		});
	}
	uploadFile(filename) {
		const key = filename;
		const localFile = path.join(this.absolutePath, filename);
		// 文件上传
		this.formUploader.putFile(
			this.uploadToken,
			key,
			localFile,
			this.putExtra,
			function(respErr, respBody, respInfo) {
				if (respErr) {
					throw respErr;
				}
				if (respInfo.statusCode == 200) {
					console.log(`文件：${respInfo.data.key}，上传成功！`);
				} else {
					console.log(respInfo.statusCode);
					console.log(respBody);
				}
			}
		);
	}
}

module.exports = MyQiniuUploadPlugin;
