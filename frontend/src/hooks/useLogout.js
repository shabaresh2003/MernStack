import { UseAuthContext } from "./UseAuthContext"
import {useWorkoutsContext} from "../hooks/Useworkouts"
export const useLogout =()=>
{
    const {dispatch : workoutsDisptach} = useWorkoutsContext();


    const {dispatch}=UseAuthContext();
    const logout =()=>
    {
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        workoutsDisptach({type:"SET_WORKOUTS",payload : null})
    }
    return {logout}
}