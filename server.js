const express= require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv=require ("dotenv").config();

connectDb();
const app=express();

const port=process.env.PORT;

app.use(express.static('public'));
app.use(express.json());

app.use('/meals', require('./routes/mealRoutes'));
app.use('/goals', require('./routes/goalRoutes'));
app.use(errorHandler);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/meal', (req, res) => {
    res.sendFile(__dirname + '/public/meal.html');
});

app.get('/goal', (req, res) => {
    res.sendFile(__dirname + '/public/goal.html');
});

app.post('/meals', (req, res) => {
    res.sendFile(__dirname + '/public/meals.html');
});

app.listen(port,()=>{
console.log('Server running on port '+port);
});