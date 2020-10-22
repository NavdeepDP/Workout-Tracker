const express = require("express");
const router = express.Router();
const db = require("../models");
const path = require('path');



router.get('/exercise',function(req,res){
    
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
    //__dirname : It will resolve to your project folder.
  });

  router.get('/stats',function(req,res){
    
    res.sendFile(path.join(__dirname, "../public/stats.html"));
    //__dirname : It will resolve to your project folder.
  });
//=======================================================================================

router.get("/api/workouts/range", (req,res)=>{
    console.log("dates: " + new Date + " "  + new Date(new Date().setDate(new Date().getDate() - 7)));

    db.Workout.find({day:{'$lte':new Date(),'$gte':new Date(new Date().setDate(new Date().getDate() - 7))}})    
    .then((workouts) => {
        console.log(workouts);
        res.json(workouts);
    })
    .catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to retrieve workouts within range"
        });

    });

});

router.get("/api/workouts", function (req, res) {

    db.Workout.find({})
        .then((workouts) => {
            console.log(workouts);
            res.json(workouts);
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: true,
                data: null,
                message: "Failed to retrieve workouts"
            });

        });

});

router.get("api/workouts/:id", (req, res) => {

    db.Workout.findById(req.params.id)
        .then((foundWorkout) => {
            res.json(foundWorkout);
        })
        .catch((err) => {
            res.json({
                error: true,
                data: null,
                message: "Unable to retrieve workout"
            });
        });
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then((newWorkout) => {
        res.json(newWorkout);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to create new exercise"
        });

    });
});


router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, {

        "$push": { "exercises": req.body }
    }, { new: true })
        .then((updatedWorkout) => {
            res.json(updatedWorkout);
        }).catch((err) => {
            res.json({
                error: true,
                data: null,
                message: "Unable to update workout"
            });
        });
});

module.exports = router;