const {
  formatPods,
  formatDeployments,
} = require('./formatters');

function createK8s(core, ext) {
  function listPods() {
    return core.ns.po.get()
      .then(response => response.items)
      .then(formatPods)
  }

  function listDeployments() {
    return ext.ns.deployments.get()
      .then(response => response.items)
      .then(formatDeployments)
  }

  return {
    listPods,
    listDeployments,
  };
}

module.exports = {
  createK8s
};