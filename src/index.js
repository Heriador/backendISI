if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();    
}
const path = require('path');
const app = require('./server');
const port = app.get('port');
const host = process.env.APP_HOST
require('./database');

app.listen(port, () => {
    console.log(`server on ${port}`);
})