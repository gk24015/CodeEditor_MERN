const mongoose = require('mongoose');
// pakage to declare global variables
const config= require('config');
const db=config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db,{
            useNewUrlParser:true
        });
        
        console.log('Mongoose Connected..');

    } catch(err)
    {
        console.error(err.message);
        //exit process with failure 
        process.exit(1);
    }
};
module.exports = connectDB;