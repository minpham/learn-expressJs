const express = require('express');
const controller = require('../controller/user.controller');
const router = express.Router();


//show all user 
router.get('/', controller.index );

//show user filter
router.get('/search', controller.search );

//show page create user
router.get('/create', controller.create );

//get id user on url and show user in new page
router.get('/:id', controller.get );

//add new user in database and redirect page
router.post('/create', controller.postCreate );

module.exports = router;