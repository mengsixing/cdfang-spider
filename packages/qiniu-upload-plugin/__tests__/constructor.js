const QiniuUploadPlugin = require('../lib/qiniuUploadPlugin');

describe('QiniuUploadPlugin', () => {
  const mock = {
    publicPath: 'http://cdn.xxx.com',
    accessKey: 'usrU1J2-BTCqaODu',
    secretKey: 'Ff0Ggl7l8XdVL1uHVl6Mge',
    bucket: 'xxx',
    zone: 'Zone_z2'
  };
  describe('constructor', () => {
    it('不传参数是否提示报错', () => {
      expect(() => {
        new QiniuUploadPlugin();
      }).toThrow();
    });

    it('调用Config方法', () => {
      const qiniu = require('qiniu');
      new QiniuUploadPlugin(mock);
      expect(qiniu.conf.Config).toHaveBeenCalledTimes(1);
      expect(qiniu.form_up.FormUploader).toHaveBeenCalledTimes(1);
    });
  });

  it('webpack生命周期是否执行', () => {
    const plugin = new QiniuUploadPlugin(mock);
    const compiler = {
      hooks: {
        compilation: {
          tap: jest.fn()
        },
        done: {
          tapAsync: jest.fn()
        }
      }
    };
    plugin.apply(compiler); // webpack will do this
    expect(compiler.hooks.compilation.tap).toBeCalled();
    expect(compiler.hooks.done.tapAsync).toBeCalled();
    expect(compiler.hooks.compilation.tap.mock.calls[0][0]).toEqual(
      'QiniuUploadPlugin'
    );
    expect(compiler.hooks.done.tapAsync.mock.calls[0][0]).toEqual(
      'QiniuUploadPlugin'
    );
  });
});
