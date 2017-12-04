const {
  formatPods,
  formatDeployments,
} = require('./formatters');

const {
  createConfigMapBody,
  createDeploymentBody,
  createServiceBody,
  createIngressBody,
} = require('./templates');

function createK8s(core, ext) {

  const inflight = {
    deploy: {},
    deleteDeployment: {}
  };

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
    if (inflight.deleteDeployment[appName]) {
      return inflight.deleteDeployment[appName];
    }
    const del = ext.ns.ingresses(`${appName}-ing`).delete()
      .then(() => core.ns.services(`${appName}-svc`).delete())
      .then(() => ext.ns.deployments(`${appName}-deploy`).delete({
        body: {
          kind: 'DeleteOptions',
          apiVersion: 'v1',
          propagationPolicy: 'Background'
        }
      }))
      .then(() => core.ns.configmaps(`${appName}-config`).delete())
      .then(() => {
        delete inflight.deleteDeployment[appName];
    } );
    inflight.deleteDeployment[appName] = del;
    return del;
  }

  function deployApp(domain, appName, image, config = {}) {
    if (inflight.deploy[appName]) {
      return inflight.deploy[appName];
    }

    const configMapBody = createConfigMapBody(appName, config);
    const deploymentBody = createDeploymentBody(appName, image);
    const serviceBody = createServiceBody(appName);
    const ingressBody = createIngressBody(appName, domain);

    const deploy = core.ns.configmaps.post({ body: configMapBody})
      .then(() => ext.ns.deployments.post({ body: deploymentBody }))
      .then(() => core.ns.services.post({ body: serviceBody }))
      .then(() => ext.ns.ingresses.post({ body: ingressBody }))
      .then(() => {
        delete inflight.deploy[appName];
      });

    inflight.deploy[appName] = deploy;
    return deploy;
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