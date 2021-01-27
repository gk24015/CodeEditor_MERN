const express = require('express');
//const connectDB = require('./config/db');
const app= express();
//connect database
//connectDB();

app.use(express.json());

app.get('/',(req,res) => res.send("Runnin"));
//connecting to server
const PORT = process.env.PORT|| 5000;
app.listen(PORT,() => console.log('Server started'));

