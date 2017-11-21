const { name } = require('./package.json');

module.exports = require('rc')(name, {
  appName: name,
  port: 8080,
  k8s: {
    promises: true,
    namespace: 'default'
  }
});