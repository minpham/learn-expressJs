const db = require('../db');
const shortid = require('shortid');

module.exports = {
	index: (req, res) => {
				// res.send('Hello User!'));
				res.render('users/index', {
					users: db.get('users').value()
				})	
			},
	search: (req, res) => {
				let q = req.query.q;
				let tempUsers = db.get('users').value();
				let userFilter = tempUsers.filter((user, index) => {
					return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
				});
				res.render('users/index', {
					users: userFilter,
					q
				});
			},
	create: (req, res) => {
				res.render('users/create');
			},
	get: 	(req, res) => {
				let id = req.params.id;
				let user = db.get('users').find({ id: id}).value();
				res.render('users/view', {
					user
				})
			},
	postCreate: (req, res) => {
					req.body.id = shortid.generate();
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
					db.get('users').push(req.body).write();
					res.redirect('/users');
				}
}