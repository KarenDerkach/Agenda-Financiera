import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import moment from "moment";
import 'moment/locale/es';
import { connect } from "react-redux";
import { StoreState, Event } from "../../tools/interface";
import {  deleteEvent, getAllEvents} from "../../redux/actions/Calendar/events"
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import{messages}  from './messageCalendar'
import swal from 'sweetalert';
import './CalendarScreen.css';
import NewEvent from "./NewEvent";


const locales = moment.locale('es');

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
interface DetailProps {
  stateEvent: Event[];
  getAllEvents():any;
}




function CalendarScreen(props: DetailProps) {

  React.useEffect(() => {
    props.getAllEvents();
  }, [props]);

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
          <h1>Calendario</h1>
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
           events={props.stateEvent} 
          //  resources={props.stateEvent}
          //  resourceIdAccessor={(event: Event) => event.title}
           startAccessor="start" 
           endAccessor="end"
           messages={messages}
           defaultView="month"
           defaultDate={new Date()}
            onSelectEvent={(event) => swal( event.type[0], event.title )}
          style={{ height: 500, margin: "50px" }} 
            />
      </div>
     
  );
}

const mapStateToProps = (state: StoreState): { stateEvent: Event[] } => {
  return {
    stateEvent: state.stateEvent,
  };
};

export default connect(mapStateToProps, { deleteEvent, getAllEvents})(CalendarScreen);
