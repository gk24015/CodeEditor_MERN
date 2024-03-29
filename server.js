const express = require('express');
//const { Mongoose } = require('mongoose');
const connectDB = require('./config/db');
const app= express();

//connect database
connectDB();
app.use(express.json({extended: false}));

app.use(express.json());
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.get('/',(req,res) => res.send("Runnin"));
//connecting to server
const PORT = process.env.PORT|| 5000;
app.listen(PORT,() => console.log('Server started'));

