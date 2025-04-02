const mongoose= require("mongoose");

const goalSchema= mongoose.Schema({
calories:{
    type: Number,
    required: [true, "Ajoutez votre objectif calorique"],
},
proteines:{
    type: Number,
    required: [true, "Ajoutez votre objectif en protéines"],
},
glucides:{
    type: Number,
    required: [true, "Ajoutez votre objectif en glucides"],
},
lipides:{
    type: Number,
    required: [true, "Ajoutez votre objectif en lipides"],
},
},
{
timestamps:true,
});

module.exports = mongoose.model("Goal", goalSchema);