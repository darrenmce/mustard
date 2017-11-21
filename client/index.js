const React = require('react');
const { renderToString } = require('react-dom/server');
const { Main } = require('./lib/main');

function createClient(k8s, baseUrl) {

  async function getProps() {
    return {
      pods: await k8s.listPods(),
      deployments: await k8s.listDeployments(),
      baseUrl,
    };
  }

  async function generateContent() {
    const props = await getProps();
    return renderToString(React.createElement(Main, props, null));
  }

  return { generateContent };

}
module.exports = {
  createClient,
};