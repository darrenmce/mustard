const React = require('react');
const { renderToString } = require('react-dom/server');
const { Main } = require('./lib/main');

function createClient(k8s) {

  async function getProps() {
    return {
      pods: await k8s.listPods()
    };
  }

  async function generateContent() {
    const props = await getProps();
    return renderToString(
      <Main {...props} />
    );
  }

  return { generateContent };

}
module.exports = {
  createClient,
};