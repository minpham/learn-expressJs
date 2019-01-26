const express = require('express');
const router = express.Router();

const controller = require('../controller/transfer.controller');

router.get('/create', controller.create);
router.post('/create', controller.postCreate);

module.exports = router;

