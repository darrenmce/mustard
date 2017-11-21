require('babel-core/register')({
  presets: ['react']
});

const Api = require('kubernetes-client');

const config = require('./config');
const { createServer } = require('./lib/server.js');
const { createK8s } = require('./lib/k8s');

let apiConfig;
if (config.useKubeConfig) {
  apiConfig = Api.config.fromKubeconfig();
} else {
  apiConfig = Api.config.getInCluster();
}

const core = new Api.Core({
  ...apiConfig,
  ...config.k8s,
});

const k8s = createK8s(core);
const server = createServer({ k8s });

server.listen(config.port, () => {
  console.log(`${config.appName} running on port ${config.port}...`);
});