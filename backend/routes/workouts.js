const express = require("express")
const {
    createWorkout,
    getworkouts,
    getsingleworkout,
    deleteWorkout,
    updateworkout
} =require('../Contollers/workoutcontrollers')
const Workout = require('../models/Workoutmodel.js')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
//get all the worksouts data from db 
router.use(requireAuth)
router.get("/",getworkouts);

//get the  workout by id
router.get("/:id", getsingleworkout);

//post the workout 
router.post("/",createWorkout);


//delete the workout 
router.delete('/:id',deleteWorkout)


//update the workout
router.patch('/:id',updateworkout)


module.exports =router