
const express = require('express');
const morgan = require('morgan');

const dishRouter = require('./router/dishRouter');

const app = express();
const  cors = require('cors');


//MIDDLEWARES
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(express.static(`${__dirname}/public`))

//3) ROUTES

    app.use('/api/v1/dishes' , dishRouter);
   
    
module.exports = app;
    
