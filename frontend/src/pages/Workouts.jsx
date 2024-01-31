import { useEffect, useRef, useState } from "react"
import Container from "../components/Container"
import { Workout } from "../components/Workout"
import { AddWorkout } from "../components/AddWorkout"
import { toast } from 'react-toastify';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const Workouts = () => {
  const { workouts, workout, dispatch } = useWorkoutsContext()

  const [isLoading, setIsLoading] = useState(false)
  const dialog = useRef()

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(process.env.REACT_APP_API_URL + '/api/workouts',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        )
        const data = await res.json()
        if (res.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: { workouts: data } })
        }
      } catch (err) {
        toast.error(err.message)
      }
      setIsLoading(false)
    }
    fetchWorkouts()
  }, [dispatch])

  const handleReset = async () => {
    dialog.current.close()
    dispatch({ type: 'GET_WORKOUT', payload: { workout: null } })
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts/${workout._id}`, {
        method: 'DELETE'
      })
      const json = await res.json()
      if (res.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: { workout: workout } })
        toast.success(`'${workout.title}' deleted successfully`)
      } else {
        toast.error(json.error)
      }
    } catch (error) {
      toast.error(error.message)
    }
    dialog.current.close()
    setIsLoading(false)
  }

  return (
    <Container className="dark:bg-zinc-800 min-h-screen">
      <div className="md:grid flex flex-col-reverse grid-cols-5 md:gap-10">
        <div className="col-span-3 py-10 flex flex-col gap-5">
          {
            isLoading ?
              <span className="is-loading"></span> :
              !workouts || workouts.length <= 0 ?
                'no data' :
                workouts.map((workout, index) => <Workout key={workout._id} workout={workout} dialog={dialog} />)
          }
        </div>
        <div className="col-span-2 md:my-10 max-md:mt-10 flex dark:bg-zinc-900 bg-zinc-100 rounded h-fit">
          <AddWorkout />
        </div>
        <dialog ref={dialog} aria-modal="true" className="max-w-2xl w-full backdrop:backdrop-blur-sm">
          <div className="flex flex-col justify-between gap-4 p-4 min-h-40">
            <div>
              Are you sure, you want to delete this '{workout?.title}'?
            </div>
            <div className="self-end space-x-4">
              <button onClick={handleDelete}>Delete {isLoading ? <span className="is-loading"></span> : ''}</button>
              <button onClick={handleReset}>Cancel</button>
            </div>
          </div>
        </dialog>
      </div>
    </Container>
  )
}

export default Workouts