import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const UpdateForm = ({ workout, setIsEdit }) => {

  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user) {
      return;
    }
    const updatedWorkout = { title, load, reps };

    const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedWorkout)
    });

    const json = await response.json();

    if(response.ok) {
      setIsEdit(false);
      dispatch({ type: 'UPDATE_WORKOUT', payload: json });
    }
    window.location.reload();
  }

  return ( 
    <div className="update-form">
      <form onSubmit={handleSubmit}>

        <label>Title: </label>
        <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title} />

        <label>Load (kg): </label>
        <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        />

        <label>Number of reps: </label>
        <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
 
export default UpdateForm;