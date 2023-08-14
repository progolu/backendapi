const express = require('express')
const bodyParser=require('body-parser')

const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require ('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors())

const dbConfig = require('./config/database.config.js');
const mongoose=require('mongoose')
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.
     log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//app.use(express.json())
//app.use(express.urlencoded({extended: false}))

//require('./app/routes/user.routes.js')(app);
app.use('/api/user', require('./routes/user.routes'))
// listen for requests

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on ports ${port}`))