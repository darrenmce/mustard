const express = require('express');
const morgan = require('morgan');

function createServer({ k8s }) {

  const app = express();

  app.use(morgan('tiny'));

  app.get('/healthz', (req, res) => {
    res.sendStatus(200);
    res.end();
  });

  app.get('/pods', async (req, res) => {
    const pods = await k8s.listPods();
    res.send(pods);
  });

  return app;
}

module.exports = { createServer };