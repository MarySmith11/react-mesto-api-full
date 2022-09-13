const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
require('dotenv').config(); 

const { JWT_SECRET = '12ab11231234212312323112321312313' } = process.env;

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
