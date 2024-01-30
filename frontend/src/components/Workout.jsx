import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

export const Workout = (props) => {
    const { workout, dispatch } = useWorkoutsContext()

    const handleViewUpdate = async (_workout) => {
        // setWorkout(_workout)
    }

    const handleDelete = async () => {
        props.dialog.current.showModal()
        dispatch({ type: 'GET_WORKOUT', payload: { workout: props.workout } })
    }

    return (
        <div className={`flex justify-between gap-2 border rounded py-1.5 px-2 cursor-pointer
        hover:border-[#FFAA00] transition 
        ${workout?._id === props.workout?._id ? 'border-teal-600' : ''}`}
            onClick={() => handleViewUpdate(props.workout)}
        >
            <div>
                <h2 className="font-bold">{props.workout.title}</h2>
                <p><strong>Load (kg): </strong> {props.workout.load}</p>
                <p><strong>Reps: </strong>{props.workout.reps}</p>
                <p>{props.workout.createdAt}</p>
            </div>
            <div className="flex flex-col gap-1">
                <button className="border rounded px-1.5 hover:border-red-500 hover:text-red-500 transition" type="button" onClick={handleDelete}>X</button>
            </div>
        </div>
    )
}
