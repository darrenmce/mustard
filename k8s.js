const Promise = require('bluebird');

function createK8s(core) {
  function listPods() {
    return new Promise((resolve, reject) => {
      core.ns.po.get((err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  return { listPods };
}

module.exports = {
  createK8s
};