const express= require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv=require ("dotenv").config();

connectDb();
const app=express();

const port=process.env.PORT;

app.use(express.static('public'));


app.get('/meal', (req, res) => {
    res.sendFile(__dirname + '/public/meal.html');
});

app.use(express.json());
app.use('/meals', require('./routes/mealRoutes'));
app.use('/goals', require('./routes/goalRoutes'));
app.use(errorHandler);

app.listen(port,()=>{
console.log('Server running on port '+port);
});