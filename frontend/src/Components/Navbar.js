import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { UseAuthContext } from "../hooks/UseAuthContext"

const Navbar =()=>
{

    const  {user}  = UseAuthContext();
    const { logout} = useLogout();
    
    const handleClick = () =>
    {
        logout()
    }

    return(
        <header>
            <div className="container">
             <Link to="/">
                <h1>WorkoutBuddy</h1>
             </Link>
             <nav>
                { user &&  (
                <div>
                    <span>{user.email}</span>
                    <button onClick={handleClick}>Logout</button>
                </div>
                )}
                { !user && (
                <div>
                    <Link to ="/login">Login</Link>
                    <Link to ="/signup">signup</Link>
                </div>
                )}
             </nav>
            </div>
        </header>
    )
}
export default Navbar;
