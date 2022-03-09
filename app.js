const path = require('path');
const fs = require('fs');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');
const AppError = require('./utils/appError');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const errorController = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL Middleware
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficult',
      'price'
    ]
  })
);

// Test middleware
app.use((req, res, next) => {
  req.requestAt = new Date().toLocaleString();
  // console.log(req.cookies);
  next();
});

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Couldn't find route ${req.originalUrl} :((`);
  // err.statusCode = 404;
  next(new AppError(`Couldn't find route ${req.originalUrl} :((`, 404));
});

app.use(errorController);

// 4) SERVER
module.exports = app;
