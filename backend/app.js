const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit'); 
const helmet = require('helmet'); 

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger'); 

const NotFoundError = require('./errors/not-found-err');
const { auth } = require('./middlewares/auth');

const corsOptions = { 
  origin: ['https://marysmith.nomoredomains.sbs', 'http://marysmith.nomoredomains.sbs'], 
  credentials: true,
  allowedHeaders: [
    'Accept',
    'X-Requested-With',
    'Origin',
    'Content-Type',
    'Authorization'
  ],
  methods: [
    'GET',
    'HEAD',
    'PUT',
    'PATCH',
    'PUT',
    'DELETE',
    'OPTIONS'
  ],
};
 
const limiter = rateLimit({ 
  windowMs: 60 * 1000, 
  max: 150,
}); 

const app = express();
const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('*', cors()); 
app.use(limiter); 
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger); 

app.get('/crash-test', () => { 
  setTimeout(() => { 
    throw new Error('Сервер сейчас упадёт'); 
  }, 0); 
}); 

app.use(authRouter);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use((req, res, next) => {
  next(new NotFoundError('По данному запросу api не найден'));
});

app.use(errorLogger); 
app.use(errors());

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  next();
});

app.listen(PORT);
