'use strict';

module.exports = {
  app: 'xgames',
  appId: '70075e10-7c7f-11e5-9c20-895499e552c7',
  common: 'gb',
  moduleList: ['gb', 'games'],
  deploy: {
    local: {
      fdPath: '/'
    },
    qiang: {
      host: 'labs.qiang.it',
      user: '',
      pass: '',
      port: 21,
      remotePath: '/labs.qiang.it/h5/xgames'
    },
    jdTest: {
      host: '192.168.193.32',
      user: '',
      pass: '',
      port: 22,
      fdPath: '/fd/h5',
      domain: 's.paipaiimg.com',
      remotePath: '/export/paipai/resource/static/fd/h5/xgames',
      cssi: '/export/paipai/resource/sinclude/cssi/fd/h5/xgames',
      assestPrefix: '/static/fd/h5/xgames',
      shtmlPrefix: '/sinclude/cssi/fd/h5/xgames'
    },
    tencent: {
      host: '172.25.34.21',
      user: '',
      pass: '',
      port: 21,
      fdPath: '/fd/h5',
      domain: 'static.paipaiimg.com',
      remotePath: '/newforward/static/fd/h5/xgames',
      cssi: '/newforward/static/sinclude/cssi/fd/h5/xgames',
      assestPrefix: '/static/fd/h5/xgames',
      shtmlPrefix: '/static/sinclude/cssi/fd/h5/xgames'
    }
  }
};
