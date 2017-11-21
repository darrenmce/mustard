const express = require('express');
const morgan = require('morgan');
const sessions = require('client-sessions');

const { createClient } = require('../client');

function asyncMiddleware(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
}

function createServer({ k8s, domain, baseUrl, sessionSecret, loginKey }) {

  const rootPath = baseUrl || '/';
  const app = express();
  const { generateContent } = createClient(k8s, baseUrl);

  app.use(morgan('tiny'));
  app.set('view engine', 'pug');
  app.use(express.static('static'));

  app.get('/healthz', (req, res) => {
    res.sendStatus(200);
    res.end();
  });

  app.use(sessions({
    cookieName: 'session',
    secret: sessionSecret,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
  }));

  app.get('/login', (req, res) => {
    if (req.query.key === loginKey) {
      req.session.auth = true;
      return res.redirect(rootPath);
    }
    res.render('login', { baseUrl });
  });

  app.use((req, res, next) => {
    if (!req.session.auth) {
      return res.redirect(`${baseUrl}/login`);
    }
    next();
  });

  app.get('/pods', asyncMiddleware(async (req, res) => {
    const pods = await k8s.listPods();
    res.send(pods);
  }));

  app.get('/delete/:appName', asyncMiddleware(async (req, res) => {
    const { appName } = req.params;
    await k8s.deleteDeployment(appName);
    res.redirect(rootPath);
  }));

  app.get('/deploy', asyncMiddleware(async (req, res) => {
    const { appName, image } = req.query;
    if (!appName || !image) {
      res.sendStatus(400);
      return res.end();
    }
    await k8s.deployApp(domain, appName, image);
    res.redirect(rootPath);
  }));

  app.get('/', asyncMiddleware(async (req, res) => {
    const content = await generateContent();
    res.render('index', { htmlContent: content });
  }));

  return app;
}

module.exports = { createServer };