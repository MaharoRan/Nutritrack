const asyncHandler=require("express-async-handler");
const Meal= require("../models/mealModel");

const getMeal=asyncHandler(async(req,res)=>{
    const meals= await Meal.find();
    res.json(meals);
})

const createMeal=asyncHandler(async(req,res)=>{
    const{nomRepas, calories,proteines,glucides,lipides}=req.body;
    if(!nomRepas || !calories || !proteines || !glucides || !lipides){
        res.status(400);
      throw new Error("All fields are mandatory")
    }
    const meal= await Meal.create({
        nomRepas, calories,proteines,glucides,lipides
    });
    res.json(meal);
})

module.exports={getMeal,createMeal};