const React = require('react');

function Pod({ pod }) {
  return (
    <div className="pod">
      <div>{pod.name}</div>
      <div>{pod.created}</div>
      <div>
        Labels:
        <ul>
          {Object.entries(pod.labels).map(entry =>
            <li key={entry[0]}>{entry.join(': ')}</li>
          )}
        </ul>
      </div>
      <div>
        Container(s):
        <ul>
          {pod.containers.map(container =>
            <li key={container.image}>{`image: ${container.image}`}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

module.exports = { Pod };