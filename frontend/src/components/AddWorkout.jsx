import { useContext, useEffect, useReducer, useState } from "react"
import { toast } from 'react-toastify'
import WorkoutContext from "../context/WorkoutContext"

export const AddWorkout = () => {

    const { fetchWorkouts, setWorkout, workout } = useContext(WorkoutContext)

    const [isLoading, setIsLoading] = useState(false)

    const initialState = {
        title: '',
        load: '',
        reps: '',
    }
    const reducer = (state, action) => {
        if (action.type === 'input') {
            return { ...state, [action.field]: action.value }
        }
        if (action.type === 'update') {
            return {
                title: action.value.title ?? '',
                load: action.value.load ?? '',
                reps: action.value.reps ?? ''
            }
        }
        if (action.type === 'reset') {
            setWorkout(false)
            return initialState
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({
            type: 'update',
            value: workout,
        })
    }, [workout])

    const handleChange = (e) => {
        dispatch({
            type: 'input',
            field: e.target.name,
            value: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/api/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state),
            })

            const res_json = await res.json()

            if (res.ok) {
                await fetchWorkouts()
                toast.success(`'${res_json.title}' added with success`)
                dispatch({ type: 'reset' })
            } else {
                toast.error(`${res_json.error}`)
            }
        } catch (error) {
            toast.success(error.message)
        }
        setIsLoading(false)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts/${workout._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state)
            })

            const res_json = await res.json()

            if (res.ok) {
                await fetchWorkouts()
                dispatch({ type: 'reset' })
                toast.success('Workout updated successfully')
            }
            else {
                toast.error(res_json.error)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={workout ? handleUpdate : handleSubmit} className="mx-auto max-w-md px-5 w-full flex flex-col gap-2 py-8">
            <div>
                <label htmlFor="title"></label>
                <input className="w-full px-2 py-1.5 outline-none md:text-lg text-base rounded" type="text" name="title" id="title" placeholder="title" value={state.title} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="load"></label>
                <input className="w-full px-2 py-1.5 outline-none md:text-lg text-base rounded" type="number" name="load" id="load" placeholder="load" value={state.load} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="reps"></label>
                <input className="w-full px-2 py-1.5 outline-none md:text-lg text-base rounded" type="number" name="reps" id="reps" placeholder="reps" value={state.reps} onChange={handleChange} />
            </div>
            <div>
                <button className="cursor-pointer dark:bg-zinc-800 bg-white rounded w-fit mx-auto py-1.5 px-2 dark:hover:bg-zinc-700 hover:bg-zinc-300" type="submit">
                    {
                        workout ? 'Update Workout' : 'Add Workout'
                    }
                    {
                        isLoading ? '...' : ''
                    }
                </button>
            </div>
        </form>
    )
}