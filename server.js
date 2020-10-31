const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const router = require('./router/router')
const connectDB = require('./config/DB')
// const cors = require('cors')

// path to the process environment config file.
dotenv.config({ path: './config/config.env' });

//bootstrapping the express framework
const app = express();

// connecting MongoDB
connectDB();

//to avoid cors policy violation
// app.use(cors());

// body json parsing middle ware
app.use(express.json())

// route middleware
app.use('/api/v1', router)

// server listening on port
app.listen(process.env.PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow))
