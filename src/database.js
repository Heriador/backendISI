const mongoose = require('mongoose');
const { dbConfig } = require("./config/index");

const URI = dbConfig.uri;

mongoose.connect(URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(`message: ${err.message}`))