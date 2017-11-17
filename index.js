const Api = require('kubernetes-client');
const { createServer } = require('./lib/server.js');

const core = new Api.Core(Api.config.getInCluster());
const server = createServer({ k8sCore: core });

server.listen(process.env.PORT || 8080, () => {
  console.log('mustard up and running...');
});