const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const messages = require('./db/messages')

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
//for testing if server works
app.get('/', (req, res) =>{
	res.json({
		message: 'Server working'
	});
});
//returns all messages stored in DB
app.get('/messages', (req, res) => {
	console.log(req.body);
	messages.getAll().then((messages) => {
		res.json(messages)
	})
});

//handles message receiving
app.post('/messages', (req, res) => {
	console.log(req.body);
	messages.create(req.body).then((messages) => {
		res.json(message);
	}).catch((error) => {
		res.status(500);
		res.json(error);
	})
});

const port = process.env.Port || 4000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});