const Workout = require('../models/Workout')
const mongoose = require('mongoose')

// Get Workouts
const getWorkouts = async (req, res) => {
    try {
        const response = await Workout.find().sort({ createdAt: -1 }) // -1 discending
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// Get workout
const getWorkout = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Not Valide ID' })
        }
        const _workout = await Workout.findById(id)
        if (!_workout) {
            return res.status(404).json({ error: 'Not Found' })
        }
        res.status(200).json(_workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Add Workout
const creatWorkout = async (req, res) => {
    const { title, load, reps } = req.body
    try {
        const response = await Workout.create({ title, reps, load })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete Workout
const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Not Valide ID' })
        }
        const _workout = await Workout.findOneAndDelete({ _id: id }) // in document _id not id
        if (!_workout) {
            return res.status(404).json({ error: 'Not Found' })
        }
        res.status(200).json(_workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update Workout
const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Not Valide ID' })
        }

        const _workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })

        if (!_workout) {
            return res.status(404).json({ error: 'Not Found' })
        }

        res.status(200).json(_workout)

    } catch (error) {
        res.status(400).json({ error: error })
    }
}

module.exports = {
    getWorkouts,
    getWorkout,
    creatWorkout,
    deleteWorkout,
    updateWorkout
}