const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const workoutRouter = require('./routes/workouts')
const cors = require('cors')
//dotEnv
dotenv.config()

// express app
const app = express()

// cors
app.use(cors())

// middlware
app.use(express.json())

app.use((req, res, next) => {
    console.log({
        path: req.path,
        method: req.method
    })
    next()
})

// routes
app.use('/api/workouts', workoutRouter)

// config db
mongoose.connect(process.env.MONGO_DB)
    .then((res) => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on http://localhost:4000')
        })
        console.log('connect to db with success')
    })
    .catch((err) => {
        console.log('Mongo DB errors: ' + err)
    })
