const express=require("express");
const router=express.Router();
const {getMeal,createMeal}=require("../controllers/mealController");

router.route('/').get(getMeal);

router.route('/').post(createMeal);


module.exports=router;