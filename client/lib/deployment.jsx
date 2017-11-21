const React = require('react');
const { Resources } = require('./components/resources');
const { Container } = require('./components/container');
const { Labels } = require('./components/labels');

function Deployment({ deployment }) {
  return (
    <div className="deployment">
      <div>{deployment.name}</div>
      <div>{deployment.created}</div>
      <Labels labels={deployment.labels} />
      <Container container={deployment.container}/>
      <Resources resources={deployment.resources}/>
    </div>
  )
}

module.exports = { Deployment };