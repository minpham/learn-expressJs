const express = require('express');
const controller = require('../controller/auth.controller');
const validate = require('../validate/validate');
const router = express.Router();

// const express = require('express');
// const controller = require('../controller/user.controller');
// const validate = require('../validate/validate');
// const router = express.Router();

router.get('/login', controller.login);

router.post('/login', validate.postLogin, controller.postLogin);

module.exports = router;