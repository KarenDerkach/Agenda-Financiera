import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (

        <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor: '#D1E2C4'}} >
            <Link  to='/'className="navbar-brand"> Inicio</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                       <Link to='/weather'className="nav-link" >Clima</Link> 
                    </li>
                    <li className="nav-item active">
                       <Link to='/calendar'className="nav-link" >Calendario</Link> 
                    </li>
                    <li className="nav-item">
                        <Link to='/cheques'className="nav-link"> Chequera</Link> 
                    </li>
                    <li className="nav-item">
                        <Link to='/calculator' className="nav-link" > Calculadora</Link>
                    </li>
                    {/* <li className="nav-item">
                       <Link to='/notas' className="nav-link"> Notas</Link> 
                    </li> */}
                </ul>
            </div>
        </nav>
   
  )
}
