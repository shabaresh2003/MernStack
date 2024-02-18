import { WorkoutsContext } from "../context/WorkoutContext";

import { useContext } from "react";

export const useWorkoutsContext =()=>
{
    const context = useContext(WorkoutsContext)
    if(!context)
    {
        throw Error('useworkouts must be inside an workoutscontext'); 
    }
    return context   
}