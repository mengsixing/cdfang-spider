module.exports = {
  auth: {
    digest: {
      Mac: jest.fn()
    }
  },
  rs: {
    PutPolicy: jest.fn(() => ({
      uploadToken: () => 'tokenxxx'
    }))
  },
  conf: {
    Config: jest.fn()
  },
  zone: {
    Zone_z2: ''
  },
  form_up: {
    FormUploader: jest.fn(),
    PutExtra: jest.fn(() => 'mockExtra'),
    putFile: jest.fn((uploadToken, key, localFile, putExtra, cb) => {
      process.nextTick(cb());
    })
  }
};
