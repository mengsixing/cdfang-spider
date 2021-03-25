const QiniuUploadPlugin = require('../lib/qiniuUploadPlugin');

// 初始化传参
const mock = {
  publicPath: 'http://cdn.xxx.com',
  accessKey: 'usrU1J2-BTCqaODu',
  secretKey: 'Ff0Ggl7l8XdVL1uHVl6Mge',
  bucket: 'xxx',
  zone: 'Zone_z2'
};

describe('handler', () => {
  describe('设置publicPath', () => {
    it('publish是否设置成功', done => {
      const plugin = new QiniuUploadPlugin(mock);
      let handler = null;
      const compiler = {
        hooks: {
          compilation: {
            tap: (event, cb) => {
              // 获取tap方法的参数
              handler = cb;
            }
          },
          done: {
            tapAsync: jest.fn()
          }
        }
      };
      // 模拟webpack编译
      plugin.apply(compiler);
      handler({
        outputOptions: {
          path: 'test.com'
        }
      });
      done();
      expect(plugin.absolutePath).toBe('test.com');
    });
  });

  describe('上传接口调用', () => {
    // 模拟2个资源，上传2次
    const tapAsyncDataMock = {
      compilation: {
        assets: ['a.js', 'b.js'],
        outputOptions: {
          publicPath: 'xxx',
          path: 'xxx'
        }
      }
    };

    it('模拟上传失败', done => {
      var qiniu = require('qiniu');
      qiniu.form_up.FormUploader = function() {
        return {
          putFile: jest.fn((uploadToken, key, localFile, putExtra, cb) => {
            process.nextTick(
              cb(null, null, {
                statusCode: 500
              })
            );
          })
        };
      };
      const plugin = new QiniuUploadPlugin(mock);
      let handler = null;
      const compiler = {
        hooks: {
          compilation: {
            tap: (event, cb) => {}
          },
          done: {
            tapAsync: (event, cb) => {
              handler = cb;
            }
          }
        }
      };
      plugin.apply(compiler);
      handler(tapAsyncDataMock, done);
      expect(
        plugin.qiniuAuthenticationConfig.formUploader.putFile
      ).toHaveBeenCalledTimes(2);
    });

    it('模拟上传成功', done => {
      var qiniu = require('qiniu');
      qiniu.form_up.FormUploader = function() {
        return {
          putFile: jest.fn((uploadToken, key, localFile, putExtra, cb) => {
            process.nextTick(
              cb(null, null, {
                statusCode: 200
              })
            );
          })
        };
      };
      const plugin = new QiniuUploadPlugin(mock);
      let handler = null;
      const compiler = {
        hooks: {
          compilation: {
            tap: (event, cb) => {}
          },
          done: {
            tapAsync: (event, cb) => {
              handler = cb;
            }
          }
        }
      };
      plugin.apply(compiler);
      handler(tapAsyncDataMock, done);
      expect(
        plugin.qiniuAuthenticationConfig.formUploader.putFile
      ).toHaveBeenCalledTimes(2);
    });

    it('模拟覆盖上传', done => {
      var qiniu = require('qiniu');
      qiniu.form_up.FormUploader = function() {
        var uploadTimes = 0;
        return {
          putFile: jest.fn((uploadToken, key, localFile, putExtra, cb) => {
            var code = 614;
            uploadTimes++;
            if (uploadTimes >= 1) {
              code = 200;
            }
            process.nextTick(
              cb(null, null, {
                statusCode: code
              })
            );
          })
        };
      };
      mock.cover = true;
      const plugin = new QiniuUploadPlugin(mock);
      let handler = null;
      const compiler = {
        hooks: {
          compilation: {
            tap: (event, cb) => {}
          },
          done: {
            tapAsync: (event, cb) => {
              handler = cb;
            }
          }
        }
      };
      plugin.apply(compiler);
      handler(tapAsyncDataMock, done);
      expect(
        plugin.qiniuAuthenticationConfig.formUploader.putFile
      ).toHaveBeenCalledTimes(2);// 第一次，上传返回614，第二次重传
    });
  });
});
