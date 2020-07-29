const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const morgan = require('morgan');


//Settings
app.set('port', process.env.PORT || 4000);


//Middlewares
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/public', express.static(`${__dirname}/public`)); 


//Routes
app.use('/api/users',require('./routes/users.routes'));
app.use('/api/files', require('./routes/files.routes'));
app.use('/api/categories',require('./routes/categories.routes'));


module.exports = app;