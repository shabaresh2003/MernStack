import { useState } from "react";
import { useWorkoutsContext } from "../hooks/Useworkouts";
import { UseAuthContext } from "../hooks/UseAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = UseAuthContext();
  const [title, settitle] = useState('');
  const [load, setload] = useState('');
  const [reps, setreps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setemptyfields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must Login");
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);

      // Check if json.emptyFields exists before setting the state
      if (json.emptyFields) {
        setemptyfields(json.emptyFields);
      } else {
        setemptyfields([]); // Set it to an empty array if not present
      }
    } if(response.ok){
      settitle('');
      setload('');
      setreps('');
      setError(null);
      setemptyfields([]);

      console.log("New Workout added");
      console.log(workout);

      dispatch({ type: "CREATE_WORKOUTS", payload: json });
    }
  };

  

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label> Exercise Title : </label>
      <input
        type="text"
        onChange={(e) => settitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error':""}
      />

      <label> Load (kg) : </label>
      <input
        type="number"
        onChange={(e) => setload(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error':""}
      /><br />

      <label> Reps : </label>
      <input
        type="number"
        onChange={(e) => setreps(e.target.value)}
        value={reps}
        className={emptyFields.includes('Reps') ? 'error':""}
      /><br />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
