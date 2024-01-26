const express = require("express")
const {
    getWorkouts,
    getWorkout,
    creatWorkout,
    deleteWorkout,
    updateWorkout,
} = require('../controllers/workoutController')
const router = express.Router()

// All Workout
router.get('/', getWorkouts)

// Add a new Workout
router.post('/', creatWorkout)

// Single Workout
router.get('/:id', getWorkout)

// Delete Workout
router.delete('/:id', deleteWorkout)

// Update a new Workout
router.patch('/:id', updateWorkout)

module.exports = router