const React = require('react');
const { Pod } = require('./pod');
const { Deployment } = require('./deployment');

function Main({ pods, deployments }) {
  return (
    <div>
      <div>
        <h2>Deployments</h2>
        { deployments.map(deployment =>
          <Deployment key={deployment.name} deployment={deployment} />
        )}
      </div>
      <div>
        <h2>Pods</h2>
        { pods.map(pod =>
          <Pod key={pod.name} pod={pod} />
        )}
      </div>
    </div>
  );
}

module.exports = { Main };