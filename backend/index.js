const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.get('/', (req, res) => res.send("API is up and running..."));

app.use('/products', productRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log("Listening");
});
