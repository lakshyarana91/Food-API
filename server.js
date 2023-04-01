const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
var cors = require('cors')

const app = require('./app');

// app.use(cors())

const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB connection successfull'))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App Running on port ${port}...`);
});