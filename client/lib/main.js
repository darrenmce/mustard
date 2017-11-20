const React = require('react');
const { Pod } = require('./pod');

function Main({ pods }) {
  return (
    <div>
      { pods.map(pod =>
        <Pod key={pod.name} pod={pod} />
      )}
    </div>
  )
}

module.exports = { Main };