import { useEffect, useRef, useState } from "react"
import Container from "../components/Container"
import { Workout } from "../components/Workout"
import { AddWorkout } from "../components/AddWorkout"
import WorkoutContext from "../Context/WorkoutContext"
import { toast } from 'react-toastify';

const Workouts = () => {
  const [workouts, setWorkouts] = useState(null)
  const [workout, setWorkout] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dialog = useRef()

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
      setWorkouts(data)
    } catch (err) {
      toast.error(err.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const handleDelete = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts/${workout._id}`, {
        method: 'DELETE'
      })
      const json = await res.json()
      if (res.ok) {
        fetchWorkouts()
        toast.success(`'${workout.title}' deleted successfully`)
      } else {
        toast.error(json.error)
      }
    } catch (error) {
      toast.error(error.message)
    }
    dialog.current.close()
  }

  return (
    <WorkoutContext.Provider value={{ fetchWorkouts, workout, setWorkout, dialog }}>
      <Container className="dark:bg-zinc-800 min-h-screen">
        <div className="md:grid flex flex-col-reverse grid-cols-5 md:gap-10">
          <div className="col-span-3 py-10 flex flex-col gap-5">
            {
              isLoading ?
                'loading..' :
                !workouts || workouts.length <= 0 ?
                  'no data' :
                  workouts.map((workout, index) => <Workout key={workout._id} workout={workout} />)
            }
          </div>
          <div className="col-span-2 md:my-10 max-md:mt-10 flex dark:bg-zinc-900 bg-zinc-100 rounded h-fit">
            <AddWorkout />
          </div>
          <dialog ref={dialog} aria-modal="true" className="max-w-2xl w-full backdrop:backdrop-blur-sm">
            <div className="flex flex-col justify-between gap-4 p-4 min-h-40">
              <div>
                Are you sure, you want to delete this '{workout.title}'?
              </div>
              <div className="self-end space-x-4">
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => dialog.current.close()}>Cancel</button>
              </div>
            </div>
          </dialog>
        </div>
      </Container>
    </WorkoutContext.Provider>
  )
}

export default Workouts