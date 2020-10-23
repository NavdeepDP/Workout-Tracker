const express = require("express");
const router = express.Router();
const db = require("../models");
const path = require('path');



router.get('/exercise', function (req, res) {

    res.sendFile(path.join(__dirname, "../public/exercise.html"));

});

router.get('/stats', function (req, res) {

    res.sendFile(path.join(__dirname, "../public/stats.html"));

});

router.get("/", function (req, res) {

    res.sendFile(path.join(__dirname, "../public/index.html"));

});
//=======================================================================================

router.get("/api/workouts/range", (req, res) => {
    console.log("dates: " + new Date + " " + new Date(new Date().setDate(new Date().getDate() - 7)));

    db.Workout.find({ day: { '$lte': new Date(), '$gte': new Date(new Date().setDate(new Date().getDate() - 7)) } })
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

    // db.Workout.find({}).limit(7)
    //     .then((workouts) => {
    //         console.log(workouts);
    //         res.json(workouts);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.json({
    //             error: true,
    //             data: null,
    //             message: "Failed to retrieve workouts"
    //         });

    //     });

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

    // validating exercise before pushing to data base
    const exercise = req.body;
    console.log("Exercise: " + exercise);

    if (exercise.type === "resistance") {
        if (exercise.name === "" && exercise.duration === 0 && exercise.weight === 0 && exercise.reps === 0 && exercise.sets === 0) {
            console.log("Unable to update workout. Invalid Values");
            return res.json({
                error: true,
                data: null,
                message: "Unable to update workout. Invalid Values"
            });
        }
    }
    else if (exercise.type === "cardio") {
        if (exercise.name === "" && exercise.duration === 0 && exercise.distance === 0) {
            console.log("Unable to update workout. Invalid Values");
            return res.json({
                error: true,
                data: null,
                message: "Unable to update workout. Invalid Values"
            });
        }

    }

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