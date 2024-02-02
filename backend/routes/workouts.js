const express = require("express")
const {
    getWorkouts,
    getWorkout,
    creatWorkout,
    deleteWorkout,
    updateWorkout,
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// middleware => require auth for all below routes
router.use(requireAuth)

// All Workout
router.get('/', getWorkouts)

// Add a new Workout
router.post('/', creatWorkout)

// Single Workout
router.get('/:id', getWorkout)

// Delete Workout
router.delete('/:id', deleteWorkout)

// Update a new Workout
router.put('/:id', updateWorkout)

module.exports = router