const express = require('express');
const morgan = require('morgan');
const { createK8s } = require('./k8s.js');

function createServer({ k8sCore }) {

  const k8s = createK8s(k8sCore);
  const app = express();

  app.use(morgan('tiny'));

  app.get('/healthz', (req, res) => {
    res.sendStatus(200);
    res.end();
  });

  app.get('/pods', (req, res) => {
    k8s.listPods()
      .then(results => {
        res.send(results);
      });
  });

  return app;
}

module.exports = { createServer };