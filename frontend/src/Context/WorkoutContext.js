import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS': return { workouts: action.payload.workouts }
    case 'CREATE_WORKOUT': return { workouts: [action.payload.workouts, ...state.workouts] }
    case 'UPDATE_WORKOUT': return {
      workouts: state.workouts.map(workout => {
        if (workout._id === action.payload.workout._id) {
          return action.payload.workout
        }
        return workout
      })
    }
    case 'GET_WORKOUT': return {
      workouts: state.workouts,
      workout: action.payload.workout
    }
    case 'DELETE_WORKOUT': return { workouts: state.workouts.filter(workout => workout._id !== action.payload.workout._id), }
    default: return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
    workout: null
  })

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  )
}