require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const {
  dataMovies,
  PORT,
  NODE_ENV,
} = require('./utils/config');

const allowedCors = [
  'http://m0viesexpl0rer.nomoredomains.xyz',
  'https://m0viesexpl0rer.nomoredomains.xyz',
  'localhost:3000',
];

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  NODE_ENV === 'production' ? process.env.dataMovies : dataMovies,
);

app.use(requestLogger);

app.use(cookieParser());

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(
  NODE_ENV === 'production' ? process.env.PORT : PORT,
);
