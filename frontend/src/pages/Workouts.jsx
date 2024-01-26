import { useEffect, useState } from "react"
import Container from "../components/Container"

const Workouts = () => {
  const [workouts, setWorkouts] = useState([])
  const fetchWorkouts = async () => {
    const res = await fetch('http://localhost:4000/api/workouts',
      {
        method: 'GET',
      })
    const data = await res.json()
    setWorkouts(data)
  }

  useEffect(() => {
    fetchWorkouts()
  }, [])
  return (
    <Container className="bg-zinc-800 min-h-screen">
      <div className="py-10 flex flex-col gap-5">
        {
          workouts.map((workout, index) =>
            <div className="border rounded py-1.5 px-2" key={workout._id}>
              <h2>{workout.title}</h2>
              <p>{workout.load}</p>
              <p>{workout.reps}</p>
            </div>
          )
        }
      </div>
    </Container>
  )
}

export default Workouts