import { useEffect } from "react";
import WorkoutDetails from '../Components/WorkoutDetails'
import WorkoutForm from "../Components/WorkoutForm";
import { useWorkoutsContext  } from "../hooks/Useworkouts";
import { UseAuthContext } from "../hooks/UseAuthContext";
const Home = ()=>
{
    // const [workouts,setworkouts] =useState(null);
    const {workouts,dispatch} = useWorkoutsContext()
    const {user} = UseAuthContext();
    useEffect(()=>
    {
        const fetchWork = async ()=>
        {
            const response = await fetch('/api/workouts',{
                headers:{'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
            if(response.ok)
            {
                // setworkouts(json)
                dispatch({type:'SET_WORKOUTS',payload:json})
            }
        }
        if(user)
        {
            fetchWork()
        }
        
    },[dispatch,user])
    return (
        <div className="Home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>

    )
}
export default Home;