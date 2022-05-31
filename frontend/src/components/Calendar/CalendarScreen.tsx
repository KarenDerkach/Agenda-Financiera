import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import moment from "moment";
import 'moment/locale/es';
import {   getAllEvents} from "../../redux/actions/Calendar/events"
import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import{messages}  from '../../tools/messageCalendar'
import './CalendarScreen.css';
import NewEvent from "./NewEvent";
import { StoreState } from "../../tools/interface";


const locales = moment.locale('es');

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});







 export default function CalendarScreen() {

  const infoEvents = useSelector((state: StoreState) => state.stateEvent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

 // console.log("ESTADO DE EVENTOS",infoEvents)

    /*CONFIG MODAL*/

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  /////////////////////////////////////////

  
  return (
      <div>
          <h1 className="title-calendar">Calendario</h1>
          <div className="container-view">
      <div className='section-btn'>

        <div className='new-event-btn'>
          <button
            type="button"
            className="btn btn-primary"
            onClick={openModal}
          >
            Nuevo Evento
          </button>
          {modalIsOpen ? <NewEvent modal={modalIsOpen} openModal={openModal} closeModal={closeModal}/> : null}
        </div>
        <div className="detail-event-btn">
        <Link to='/events'> <button className="btn btn-outline-info">Lista de Eventos</button> </Link> 
        </div>
        </div>


      </div>
        
         
          <Calendar 
          localizer={localizer}
           events={infoEvents} 
           startAccessor="start" 
           endAccessor="end"
           messages={messages}
           defaultDate={new Date()}
           // onSelectEvent={(events) => swal( events.type[0], events.title )}
          style={{ height: 500, margin: "50px" }} 
            />
      </div>
     
  );
}




