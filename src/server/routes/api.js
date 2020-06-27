const express = require('express');

const LoginDao = require('../dao/LoginDao');

module.exports = (config) => {
  const router = express.Router();

  router.get('/api/login', LoginDao.validateSignIn);

  return router;
};
