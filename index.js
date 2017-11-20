
require('babel-core/register')({
  presets: ['react']
});

const Api = require('kubernetes-client');
const { createServer } = require('./lib/server.js');
const { createK8s } = require('./lib/k8s');

let core;
if (process.env.DEV_MODE) {
  core = require('./mocks/mock-core');
} else {
  const apiConfig = Api.config.getInCluster();
  core = new Api.Core({
    ...apiConfig,
    promises: true,
  });
}

const k8s = createK8s(core);

const server = createServer({ k8s });

server.listen(process.env.PORT || 8080, () => {
  console.log('mustard up and running...');
});