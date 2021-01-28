const express = require('express');
//const { Mongoose } = require('mongoose');
const connectDB = require('./config/db');
const app= express();
//connect database
connectDB();

app.use(express.json());

app.get('/',(req,res) => res.send("Runnin"));
//connecting to server
const PORT = process.env.PORT|| 3000;
app.listen(PORT,() => console.log('Server started'));

