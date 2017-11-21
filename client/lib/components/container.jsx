const React = require('react');

function Container({ container }) {
  if (!container) return null;
  return (
    <div>
      Container:
      <ul>
        <li>{`image: ${container.image}`}</li>
      </ul>
    </div>
  );
}

module.exports = { Container };