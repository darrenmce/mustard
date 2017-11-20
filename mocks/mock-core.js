const Promise = require('bluebird');

module.exports = {
  ns: {
    po: {
      get() {
        return Promise.resolve(require('./pods.json'))
      }
    }
  }
};