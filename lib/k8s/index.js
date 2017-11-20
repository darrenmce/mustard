const { formatPods } = require('./formatters');

function createK8s(core) {
  function listPods() {
    return core.ns.po.get()
      .then(response => response.items)
      .then(formatPods)
  }

  return { listPods };
}

module.exports = {
  createK8s
};