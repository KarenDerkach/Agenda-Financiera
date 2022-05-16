import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
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
            <Button variant="outline-warning" onClick={LogOut}>Salir</Button> :
          <>  <Link to='/login' style={{textDecoration: 'none', color: 'transparent' }}><Button variant="outline-secondary">Ingresar</Button></Link>  
           <Link to='/register' style={{textDecoration: 'none', color: 'transparent' }}> <Button variant="outline-light">Registrarse</Button></Link></>
            }
      
        
      
        
        
  </div>
  )
}
