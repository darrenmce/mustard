const React = require('react');

function Resources({ resources }) {
  if (!resources) return null;
  return (
    <div>
      Resources:
      <ul>
        {Object.entries(resources).map(entry =>
          <li key={entry[0]}>{entry.join(': ')}</li>
        )}
      </ul>
    </div>
  );
}

module.exports = { Resources };