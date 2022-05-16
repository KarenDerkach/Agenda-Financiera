import React from 'react'
import { Link } from 'react-router-dom'
import { logout} from '../../redux/actions/User/userActions'
import {  useSelector, useDispatch } from "react-redux";

export default function Main() {
const userLogin = useSelector((state:any) => state.stateUser)
// console.log("este este el estado del usuario", userLogin.isLogged)
const dispatch = useDispatch()
 
const LogOut = (e:any) => {
e.preventDefault();
dispatch(logout())
}
  return (
    <div>
        

            {userLogin.isLogged ? 
            <button onClick={LogOut}>Salir</button> :
          <>  <Link to='/login'><button>Ingresar</button></Link>  
           <Link to='/register'> <button>Registrarse</button></Link></>
            }
      
        
      
        
        
  </div>
  )
}
