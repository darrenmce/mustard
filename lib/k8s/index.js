const {
  formatPods,
  formatDeployments,
} = require('./formatters');

const {
  createDeploymentBody,
  createServiceBody,
  createIngressBody,
} = require('./templates');

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

  function deleteDeployment(appName) {
    return ext.ns.ingresses(`${appName}-ing`).delete()
      .then(() => core.ns.services(`${appName}-svc`).delete())
      .then(() => ext.ns.deployments(`${appName}-deploy`).delete({
        body: {
          kind: 'DeleteOptions',
          apiVersion: 'v1',
          propagationPolicy: 'Foreground'
        }
      }));
  }

  function deployApp(domain, appName, image) {
    const deploymentBody = createDeploymentBody(appName, image);
    const serviceBody = createServiceBody(appName);
    const ingressBody = createIngressBody(appName, domain);

    return ext.ns.deployments.post({ body: deploymentBody })
      .then(() => core.ns.services.post({ body: serviceBody }))
      .then(() => ext.ns.ingresses.post({ body: ingressBody }));
  }

  return {
    deleteDeployment,
    deployApp,
    listPods,
    listDeployments,
  };
}

module.exports = {
  createK8s
};