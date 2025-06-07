import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import UpdateForm from "./UpdateForm"


const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [isEdit, setIsEdit] = useState(false);

  const handleClick = async() => {
    if(!user) {
      return
    }
    const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  const handleEdit = async() => {
    if(!user) {
      return
    }
    setIsEdit(!isEdit);
  }

  return (
    <div className="workout-details">
      {isEdit ? (
        <UpdateForm workout={workout} key={workout._id} setIsEdit={setIsEdit}/>
      ) : (
        <>
          <h4>{workout.title}</h4>
          <p><strong>Load (kg): </strong>{workout.load}</p>
          <p><strong>Number of Reps: </strong>{workout.reps}</p>
          <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          <span className="material-symbols-outlined edit-button" onClick={handleEdit}>edit</span>
          <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </>
      )}

      
    </div>
  )
}

export default WorkoutDetails