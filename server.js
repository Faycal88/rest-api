const express = require('express');
const app = express();
const PORT = 8080;
const userRouter = require('./routes/Users');
const mongoose = require('mongoose');
require('dotenv').config({path:__dirname+'/config/.env'});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log(err);
});


app.use('/user', userRouter);


app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});