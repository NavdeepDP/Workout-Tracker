const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {      
      type: {
        type: String,    
        },
        name:String,
        duration:{
            type:Number,
            default: 0
    
        },
        duration:{
            type:Number,
            default: 0
    
        },
        weight:{
            type:Number,
            default: 0
        },
        reps:{
            type:Number,
            default: 0
        },
        sets:{
            type:Number,
            default: 0
        },
        duration:{
            type:Number,
            default: 0
        },
        distance:{
            type:Number,
            default:0
        }
    }
  ],
  
},
{ toJSON: { virtuals: true } });


WorkoutSchema.virtual("totalDuration").get(function () {
  let totalDuration =0;
  for(let i= 0; i < this.exercises.length; i++)
  {
         totalDuration = totalDuration + this.exercises[i].duration;
  }
  return totalDuration;
});


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;