const express=require("express");
const router=express.Router();
const {getMeal,createMeal,deleteMeal}=require("../controllers/mealController");

router.route('/').get(getMeal);

router.post('/', createMeal);

router.delete('/:id', deleteMeal);


module.exports=router;