const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

connectDB();

app.get('/', (req, res) => res.send("API is up and running..."));

app.use('/products', productRoutes);
app.use('/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log("Listening");
});


