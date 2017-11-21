const React = require('react');

function Labels({ labels }) {
  if (!labels) return null;
  return (
    <div>
      Labels:
      <ul>
        {Object.entries(labels).map(entry =>
          <li key={entry[0]}>{entry.join(': ')}</li>
        )}
      </ul>
    </div>
  );
}

module.exports = { Labels };