const express = require('express');
const app = express();
const cors = require('cors')
const productRouter = require("./router/product");

app.use(express.json())

app.get('/',(req, res) => {
  res.send('Welcome to the product factory');
});

app.use(cors())
app.use(express.json())
app.use('/', productRouter);

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});