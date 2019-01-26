// const db = require('../db');
const Product = require('../models/product.model');

module.exports.index = (req, res) => {
	// let product = db.get('products').value();
	// let page = parseInt(req.query.page) || 1 ;
	// let perPage = 8;

	// res.render('products/index', {
	// 	products: db.get('products').value().slice((page-1)*perPage, page*perPage)
	// });
	Product.find().then(function(products) {
		res.render('products/index', {
			products
		})
	})
}