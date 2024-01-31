import { useEffect, useReducer, useState } from "react"
import { toast } from 'react-toastify'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

export const AddWorkout = () => {

    const { workout, dispatch } = useWorkoutsContext()

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState({})

    const initialState = { title: '', load: '', reps: '' }
    const reducer = (state, action) => {
        switch (action.type) {
            case 'input': return { ...state, [action.field]: action.value }
            case 'update': return {
                title: action.value.title ?? '',
                load: action.value.load ?? '',
                reps: action.value.reps ?? ''
            }
            case 'reset': return initialState
            default: return state
        }
    }
    const [state, dispatchAdd] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatchAdd({ type: 'update', value: workout ?? {} })
    }, [workout])

    const handleChange = (e) => {
        dispatchAdd({
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
                body: JSON.stringify(state),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await res.json()
            if (res.ok) {
                dispatch({ type: 'CREATE_WORKOUT', payload: { workouts: data } })
                toast.success(`'${data.title}' added with success`)
                dispatchAdd({ type: 'reset' })
                setIsError({})
            } else {
                setIsError(data?.emptyFields)
                toast.error(`${data.error}`)
            }
        } catch (error) {
            toast.error(error.message)
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

            const data = await res.json()
            if (res.ok) {
                dispatch({ type: 'UPDATE_WORKOUT', payload: { workout: data } })
                toast.success(res.statusText)
                setIsError({})
            } else {
                setIsError(data?.emptyFields)
                toast.error(`${data.error}`)
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
                <input
                    className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent
                    ${isError?.title ? 'border-red-500' : ''}`}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="title"
                    value={state.title}
                    onChange={handleChange}
                />
                {isError?.title ? <span className="text-red-500">{isError?.title}</span> : ''}
            </div>

            <div>
                <label htmlFor="load"></label>
                <input
                    className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent
                    ${isError?.load ? 'border-red-500' : ''}`}
                    type="number"
                    name="load"
                    id="load"
                    placeholder="load"
                    value={state.load}
                    onChange={handleChange}
                />
                {isError?.load ? <span className="text-red-500">{isError?.load}</span> : ''}
            </div>

            <div>
                <label htmlFor="reps"></label>
                <input
                    className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent
                    ${isError?.reps ? 'border-red-500' : ''}`}
                    type="number"
                    name="reps"
                    id="reps"
                    placeholder="reps"
                    value={state.reps}
                    onChange={handleChange}
                />
                {isError?.reps ? <span className="text-red-500">{isError?.reps}</span> : ''}
            </div>
            <div className="flex justify-start gap-4">
                <button className="cursor-pointer dark:bg-zinc-800 bg-white rounded w-fit py-1.5 px-2 dark:hover:bg-zinc-700 hover:bg-zinc-300" type="submit">
                    {
                        workout
                            ?
                            'Update Workout'
                            :
                            'Add Workout'
                    }
                    {
                        isLoading
                            ?
                            <span className="is-loading"></span>
                            :
                            ''
                    }
                </button>
                {
                    workout
                        ?
                        <button
                            className="cursor-pointer dark:bg-zinc-800 bg-white rounded w-fit py-1.5 px-2 dark:hover:bg-zinc-700 hover:bg-zinc-300"
                            type="button"
                            onClick={() => { dispatch({ type: 'GET_WORKOUT', payload: { workout: null } }); setIsError({}) }}
                        >
                            Cancel
                        </button>
                        :
                        ''
                }
            </div>
        </form>
    )
}