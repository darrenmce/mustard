const React = require('react');
const { renderToString } = require('react-dom/server');
const { Main } = require('./lib/main');

function createClient(k8s) {

  async function generateContent() {
    const pods = await k8s.listPods();
    return renderToString(
      <Main pods={pods} />
    );
  }

  return { generateContent };

}
module.exports = {
  createClient,
};