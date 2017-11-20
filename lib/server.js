const express = require('express');
const morgan = require('morgan');
const { createClient } = require('../client');

function createServer({ k8s }) {

  const app = express();
  const { generateContent } = createClient(k8s);

  app.use(morgan('tiny'));
  app.set('view engine', 'pug');
  app.use(express.static('static'));

  app.get('/healthz', (req, res) => {
    res.sendStatus(200);
    res.end();
  });

  app.get('/pods', async (req, res) => {
    const pods = await k8s.listPods();
    res.send(pods);
  });

  app.get('/', async (req, res) => {
    const content = await generateContent();
    res.render('index', { htmlContent: content });
  });

  return app;
}

module.exports = { createServer };