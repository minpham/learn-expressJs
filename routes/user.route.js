const express = require('express');
const controller = require('../controller/user.controller');
const validate = require('../validate/validate');
const router = express.Router();


//show all user 
router.get('/', controller.index );

//show user filter
router.get('/search', controller.search );
// const middleware1 = (req, res, next) => {
// 	console.log('middleware1');
// 	return;
// 	next();
// }
//show page create user
router.get('/create', controller.create );

//example cookie
router.get('/cookie', (req, res, next) => {
	res.cookie('user-id', 12345);
	res.send('Hello User');
})

//get id user on url and show user in new page
router.get('/:id', controller.get );

//add new user in database and redirect page
router.post('/create', validate.postCreate, controller.postCreate );

module.exports = router;