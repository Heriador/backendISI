const express = require('express');
const cors = require('cors');
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
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'));
}

//Routes
app.use('/api/users',require('./routes/users.routes'));
app.use('/api/files', require('./routes/files.routes'));
app.use('/api/categories',require('./routes/categories.routes'));


module.exports = app;