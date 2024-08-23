const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors());

require('./database')
require('./customer/customer.model');
require('./order/order.model')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./router'))

const port = 5000;

app.listen(port, () => {
	console.log(`server is running at ${port}`);
})
