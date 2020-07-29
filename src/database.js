const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

mongoose.connect(URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(`message: ${err.message}`))