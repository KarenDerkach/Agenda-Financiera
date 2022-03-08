import React from 'react'
import { Link } from 'react-router-dom'

export default function Checkbooks() {
  return (
    <div>
        <h1>Checkbooks</h1>
       <Link to='/addcheq'><button>Cheque Emitidos</button></Link>
       <Link to='/thirdCheq'><button>Cheque Recibidos</button></Link>
       
        
    </div>
  )
}
