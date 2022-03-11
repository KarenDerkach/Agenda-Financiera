
import moment from "moment";
import 'moment/locale/es';
import { connect } from "react-redux";
import { StoreState, Event } from "../../tools/interface";
import {createEvent, deleteEvent, getAllEvents} from "../../redux/actions/Calendar/events"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import{messages}  from './messageCalendar'
import swal from 'sweetalert';
import './CalendarScreen.css';


moment.locale('es');
const localizer = momentLocalizer(moment);

interface DetailProps {
  stateEvent: Event[];
  createEvent(event:Event):any;
  getAllEvents():any;
}

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOne = now.clone().add(1, 'hours');



const initEvent: Event = {
	title: '',
	notes: '',
	start: now.toDate(),
	end: nowPlusOne.toDate(),
  type: [],
  _id: ''
};

function CalendarScreen(props: DetailProps) {

  React.useEffect(() => {
    props.getAllEvents();
  }, [props]);
  
  

  
	const [formValues, setformValues] = useState(initEvent);
  
 

  const typeEvent = ["Cumpleaños","Reunion","Trabajo","Tareas", "Otros"]




  const handleSelectType = (e: any) => {
    setformValues({
      ...formValues,
      type: [e.target.value],
    });
  }

  const handleChange = (e:any) => {
		setformValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};

  const handleSubmit = (e:any) => {
  

    const momentStart = moment(formValues.start);
    const momentEnd = moment(formValues.end);
    
    if(formValues.title !== '' && formValues.start !== '' && formValues.end !== '' && momentStart.isBefore(momentEnd)){
      e.preventDefault();
      props.createEvent(formValues);
     swal({title:"Evento creado", icon:"success"});
      setformValues(initEvent);
     }
    else{
      
      swal({title:"Compruebe los campos ingresados", icon:"warning"});
    }
   

  }
  return (
      <div>
          <h1>Calendario</h1>
          <div className="container-view">
      <div className='section-btn'>

        <div className='new-event-btn'>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#modal1"
          >
            Nuevo Evento
          </button>
        </div>
        <div className="detail-event-btn">
        <Link to='/events'> <button className="btn btn-outline-info">Lista de Eventos</button> </Link> 
        </div>
        </div>
      </div>


        <div className="modal" id="modal1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nuevo evento</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) =>handleSubmit(e)}>
              <div className="form-group">
                  <label>Tipo</label>
                  <select onClick={(e)=>handleSelectType(e)}>
                    {
                      typeEvent.map((type: string) => {
                        return (
                          <option key={type} value={type}>{type}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Titulo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingrese nombre del evento ..."
                    name="title"
                    value={formValues.title}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Fecha Inicio</label>
                  <input
                    type="date"
                    name="start"
                    className="form-control"
                    value={formValues.start}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Fecha de finalizacion
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="end"
                    value={formValues.end}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Notas</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="datos adicionales ..."
                    name="notes"
                    value={formValues.notes}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) =>handleSubmit(e)}
              >
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
         
          <Calendar 
          localizer={localizer}
           events={props.stateEvent} 
           startAccessor="start" 
           endAccessor="end"
           messages={messages}
           selectable={true}
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

export default connect(mapStateToProps, { createEvent,deleteEvent, getAllEvents})(CalendarScreen);
