const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userrouter = require('./router/userrouter');
const productRouter = require("./router/product");

app.use(express.json())

app.get('/',(req, res) => {
  res.send('Welcome to the product factory');
});

app.use(cors())
app.use(express.json())
app.use('/', productRouter);
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/',userrouter)
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db= mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))

app.listen(3000, function () {
  console.log(`App listening on port ${port}!`);
});