import React from 'react'
import './Menu.css'
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'

export default function Menu() {
  return (
    <div className='bkg-main'>
     <div className='menu-container'>
     <h1 className='menu-title'>Agenda Financiera</h1>

     <h4 className='sub-title-menu'>Funcionalidades</h4>
     
     <ul className='list-items'>
        <li className='item-menu'><IoMdCheckmarkCircleOutline className='icon-check'/>  Visualizar el clima de tu localidad</li>
       <li className='item-menu'> <IoMdCheckmarkCircleOutline className='icon-check'/>  Administrar Cheques recibidos o emitidos</li>
        <li  className='item-menu'>  <IoMdCheckmarkCircleOutline className='icon-check'/>  Servicio Calculadora</li>
        <li className='item-menu'> <IoMdCheckmarkCircleOutline className='icon-check'/>  Servicio Calendario</li>
       {/* <li className='item-menu'> <IoMdCheckmarkCircleOutline/>  Servicio de Notificaciones de vencimientos mensuales</li> */}
     </ul>
     </div>
        
    </div>
  )
}
