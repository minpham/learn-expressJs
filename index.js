require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8080;

//get body from formS
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes//auth.route');
const productRoute = require('./routes/product.route');
const middleWare = require('./middlewares/user.middleware');

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRECT));


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
app.use('/products', productRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}`));