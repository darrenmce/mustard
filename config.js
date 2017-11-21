const { name } = require('./package.json');

module.exports = require('rc')(name, {
  appName: name,
  baseUrl: '/mustard',
  port: 8080,
  k8s: {
    promises: true,
    namespace: 'default'
  },
  sessionSecret: 'dsflkj3o9jdslkhuhdfjhtg4ojdfslgdfg',
  loginKey: 'hotdog'
});