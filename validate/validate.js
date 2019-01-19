const md5 = require('md5');
const db = require('../db');

module.exports.postCreate = (req, res, next) => {
	const errors = [];
	if(!req.body.name) {
		errors.push('Name is Required');
	}
	if(!req.body.phone) {
		errors.push('Phone is Required');
	}
	if(errors.length){
		res.render('users/create', {
			errors,
			values: req.body
		});
		return;
	}

	res.locals.success = true;
	next();
}

module.exports.postLogin = ( req, res, next) => {
	let email = req.body.email;
	let password = req.body.password;

	let user = db.get('users').find({email: email}).value();
	if(!user) {
		res.render('auth/login', {
			errors : [
				'User does not exist.'
			],
			values: req.body
		});
		return;
	}
	var hashedPassword = md5(password);
	if(user.password !== hashedPassword) {
		res.render('auth/login', {
			errors: [
				'Wrong password.'
			],
			values: req.body
		});
		return;
	}

		res.cookie('userId', user.id, {
			signed: true
		});
	next();
}
