const express=require("express");
const router=express.Router();
const {getGoal,createGoal}=require("../controllers/goalController");

router.route('/').get(getGoal);

router.route('/').post(createGoal);


module.exports=router;