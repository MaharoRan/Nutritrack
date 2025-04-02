const mongoose= require("mongoose");

const mealSchema= mongoose.Schema({
nomRepas:{
      type: String,
      required: [true, "Ajoutez un repas"],
},
calories:{
    type: Number,
    required: [true, "Ajoutez votre consommation calorique"],
},
proteines:{
    type: Number,
    required: [true, "Ajoutez votre consommation en protéines"],
},
glucides:{
    type: Number,
    required: [true, "Ajoutez votre consommation en glucides"],
},
lipides:{
    type: Number,
    required: [true, "Ajoutez votre consommation en lipides"],
},
},
{
timestamps:true,
});

module.exports = mongoose.model("Meal",mealSchema);