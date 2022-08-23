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

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  NODE_ENV === 'production' ? process.env.dataMovies : dataMovies,
);

app.use(requestLogger);

app.use(cookieParser());

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(
  NODE_ENV === 'production' ? process.env.PORT : PORT,
);
