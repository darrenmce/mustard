const Api = require('kubernetes-client');
const { createServer } = require('./lib/server.js');
const { createK8s } = require('./lib/k8s');

const apiConfig = Api.config.getInCluster();
const core = new Api.Core({
  ...apiConfig,
  promises: true,
});
const k8s = createK8s(core);

const server = createServer({ k8s });

server.listen(process.env.PORT || 8080, () => {
  console.log('mustard up and running...');
});