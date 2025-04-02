const asyncHandler=require("express-async-handler");
const Goal= require("../models/goalModel");

const getGoal=asyncHandler(async(req,res)=>{
    const goals= await Goal.find();
    res.json(goals);
})

const createGoal=asyncHandler(async(req,res)=>{
    const { calories, proteines, glucides, lipides } = req.body;

    if (!calories || !proteines || !glucides || !lipides) {
        res.status(400);
        throw new Error("Please provide all the required fields: calories, proteines, glucides, lipides.");
    }

    const goal= await Goal.create({
             calories,proteines,glucides,lipides
        });
    res.json(goal);
})

module.exports={getGoal,createGoal};