const express =  require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
//const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');


//Load env Vars
dotenv.config({path:'./config/config.env'});

// Connect DataBase
connectDB();

// Route Files
 
const auth = require('./routes/auth');

// Body parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev')); 
}

// Mount Router On Specific URL
 
app.use('/api/v1/auth',auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

 

app.listen( 
  PORT,
  console.log(`server Running in ${process.env.NODE_ENV} on PORT ${PORT}`.yellow.bold)
);

 