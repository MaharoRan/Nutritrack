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

const deleteMeal = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const meal = await Meal.findById(id);
    if (!meal) {
        res.status(404);
        throw new Error("Repas non trouvé");
    }

    await meal.remove();
    res.json({ message: "Repas supprimé avec succès" });
});

module.exports={getMeal,createMeal,deleteMeal};