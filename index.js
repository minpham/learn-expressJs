const express = require('express');
const app = express();
const port = 8080;

//get body from formS
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.routes');

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.get('/', (req, res) => 
			//res.send trả về 1 string
			// res.send(`<h1>Hello World!</h1><a href="/user">List User</a>`));
			
			res.render('index', {//tham số đầu tiên là 1 cái path tính từ thư mục views
				title: 'Learn NodeJS',
				name: 'Minh',
				old: 28
			})
		);

app.use('/users', userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}`));