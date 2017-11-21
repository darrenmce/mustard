require('babel-core/register');

const Api = require('kubernetes-client');

const config = require('./config');
const { createServer } = require('./lib/server.js');
const { createK8s } = require('./lib/k8s');

let k8sAuthConfig;
if (config.useKubeConfig) {
  k8sAuthConfig = Api.config.fromKubeconfig();
} else {
  k8sAuthConfig = Api.config.getInCluster();
}

let k8sApiConfig = {
  ...k8sAuthConfig,
  ...config.k8s,
};
const core = new Api.Core(k8sApiConfig);
const ext = new Api.Extensions(k8sApiConfig);

const k8s = createK8s(core, ext);
const server = createServer({
  k8s,
  baseUrl: config.baseUrl,
  sessionSecret: config.sessionSecret,
  loginKey: config.loginKey,
  domain: config.domain,
});

server.listen(config.port, () => {
  console.log(`${config.appName} running on port ${config.port}...`);
});