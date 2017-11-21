const React = require('react');
const { Pod } = require('./pod');
const { Deployment } = require('./deployment');

function Main({ pods, deployments, baseUrl }) {
  return (
    <div>
      <div>
        <h2>New Deployment</h2>
        <form action={`${baseUrl}/deploy`}>
          <input name="appName" type="text" placeholder="application name..." />
          <input name="image" type="text" placeholder="image..." />
          <input type="submit" value="Deploy" />
        </form>
      </div>
      <div>
        <h2>Deployments</h2>
        { deployments.map(deployment =>
          <Deployment key={deployment.name} deployment={deployment} baseUrl={baseUrl} />
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