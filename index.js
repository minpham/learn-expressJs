require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const app = express();
const port = 8080;

//get body from formS
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes//auth.route');
const productRoute = require('./routes/product.route');
const cartRoute = require('./routes/cart.route');
const transferRoute = require('./routes/transfer.route');

const middleWare = require('./middlewares/user.middleware');
const sessionMiddleware = require('./middlewares//session.middleware')

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRECT));
app.use(sessionMiddleware);
app.use(csrf({ cookie: true }));


app.get('/', (req, res) => 
			//res.send trả về 1 string
			// res.send(`<h1>Hello World!</h1><a href="/user">List User</a>`));
			
			res.render('index', {//tham số đầu tiên là 1 cái path tính từ thư mục views
				title: 'Learn NodeJS',
				name: 'Minh',
				old: 28
			})
		);

app.use('/users', middleWare.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', middleWare.requireAuth, productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', middleWare.requireAuth, transferRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}`));