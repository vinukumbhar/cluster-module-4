const express = require('express')
const app = express()
require('dotenv').config();
const cors = require('cors');
const path = require('path')
const dbconnect = require('./database/db');


app.use(express.json());


const productRoutes = require('./routes/productRoutes')
app.use(cors());
// accountstasks
app.use("/products", productRoutes);
dbconnect()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
