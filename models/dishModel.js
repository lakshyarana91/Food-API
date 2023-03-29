
const mongoose = require('mongoose');


const dishSchema = new mongoose.Schema({
    strMeal:{
        type:String,
        required:[true , 'A dish must have a name'],
        unique:true,
        trim:true
    },
    strCategory:{
        type:String,
        required: [true , 'A dish must have Category']
    },
    strInstructions:{
        type:String,
        required: [true , 'A dish must have Instructions']
    },
    strYoutube:{
        type:String,
        required: [true , 'A dish must have a video']
    },
    strTags:{
        type:String,
        
        
    },
    strMealThumb:{
        type:String,
        required: [true , 'A dish must have a thumbnail']
        
    },
    strArea:{
        type:String,
        required: [true , 'A dish must have a area']
    },
    strSource:{
        type:String,
    },
    createdAt:{
        type: Date,
        default:Date.now(),
        select:false
    }
});

const Dish = mongoose.model('dish', dishSchema);

module.exports = Dish;

