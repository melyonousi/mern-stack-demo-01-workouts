import { formatDistanceToNow } from "date-fns"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

export const Workout = (props) => {
    const { workout, dispatch } = useWorkoutsContext()

    const handleDelete = async () => {
        props.dialog.current.showModal()
        dispatch({ type: 'GET_WORKOUT', payload: { workout: props.workout } })
    }

    return (
        <div className={`group flex justify-between gap-2 border rounded py-1.5 px-2 cursor-pointer
        hover:border-[#FFAA00] transition 
        ${workout?._id === props.workout?._id ? 'border-teal-600' : ''}`}
            onClick={() => dispatch({ type: 'GET_WORKOUT', payload: { workout: props.workout } })}
        >
            <div>
                <h2 className="font-bold">{props.workout.title}</h2>
                <p><strong>Load (kg): </strong> {props.workout.load}</p>
                <p><strong>Reps: </strong>{props.workout.reps}</p>
                <p>{formatDistanceToNow(new Date(props.workout.createdAt), { addSuffix: true })}</p>
            </div>
            <div className="flex flex-col justify-between gap-1">
                <button
                    className="group-hover:block hidden rounded px-1.5 hover:text-red-500 material-symbols-outlined"
                    type="button"
                    onClick={handleDelete}>
                    delete
                </button>
                {workout?._id === props.workout?._id ? <span className={` rounded px-1.5 text-teal-500 transition material-symbols-outlined`}>edit</span> : ''}
            </div>
        </div>
    )
}
