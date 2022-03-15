import React, {useState} from 'react'
import Modal from 'react-modal';
import { connect } from "react-redux";
import moment from 'moment';
import swal from 'sweetalert';
import { StoreState, Event } from "../../tools/interface";
import {createEvent,  getAllEvents} from "../../redux/actions/Calendar/events"
import DateTimePicker from 'react-datetime-picker';
// import "react-datepicker/dist/react-datepicker.css";
import style from './NewEvent.module.css'

interface EventProps {
    stateEvent: Event[];
    getAllEvents(): any;
  createEvent(event:Event):any;
    modal: boolean;
    openModal(): any;
      closeModal(): any;
  }

  /* Inicio Conf Modal */
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
        backgroundColor: '#f8f9fa',
        border: 'none',
        with: '1000px',
        height: '500px',
     

	},
};

Modal.setAppElement('#root');

/* Fin config modal */

let now = moment().minutes(0).seconds(0).add(1, 'hours');
let nowPlusOne = now.clone().add(1, 'hours');

const initEvent: Event = {
  title: '',
	notes: '',
	start: now.toDate(),
	end: nowPlusOne.toDate(),
  type: [],
  _id: ''
};


function NewEvent(props: EventProps) {
  
    const [formValues, setformValues] = useState(initEvent);

    const [startDate, setStartDate] = useState(now.toDate());
    const [endDate, setEndDate] = useState(nowPlusOne.toDate());

    const typeEvent = ["Cumpleaños","Reunion","Trabajo","Tareas", "Otros"]
  
  /**FUNCTIONS */
    const handleChangeStart =( e: any)=>{
        setStartDate(e);
        setformValues({...formValues, start: e})

    }

    const handleChangeEnd =( e: any)=>{
        setEndDate(e);
        setformValues({...formValues, end: e})

    }

    const handleSelectType = (e: any) => {
      setformValues({
        ...formValues,
        type: [e.target.value],
      });
    }
  
    //title, notas
    const handleChange = (e:any) => {
          setformValues({
              ...formValues,
              [e.target.name]: e.target.value,
          });
      };
  
    const handleSubmit = (e:any) => {
    
      const momentStart = moment(formValues.start);
      const momentEnd = moment(formValues.end);
  
      if(momentStart.isAfter(momentEnd)) return swal("Error", "La fecha de inicio no puede ser anterior a la fecha de fin", "error");
      if(formValues.title !== '' && formValues.start  && formValues.end ) {
          e.preventDefault();
          props.createEvent(formValues);
         swal({title:"Evento creado", icon:"success"});
          setformValues(initEvent);

      } else{
        swal("Error", "Complete los campos requeridos", "error");
      }
       }

  return (
 <Modal
        isOpen={props.modal}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={style.overlay}
        className={style.modal}
              >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
        
          <h5 className={style.modal_title}>Nuevo evento</h5>
          <button
            type="button"
            className="btn btn-danger"
            onClick={props.closeModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
      
        </div>
        <div className='modal-body'>
          <form onSubmit={(e) =>handleSubmit(e)}>
          <div className={style.form_group}>
              <label className={style.modal_title}>Tipo</label>
              <select className={style.form_select} onClick={(e)=>handleSelectType(e)}>
                {
                  typeEvent.map((type: string) => {
                    return (
                      <option key={type} value={type}>{type}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className={style.form_group}>
              <label className={style.modal_title} >Titulo</label>
              <input
                className={style.form_input}
                type="text"
                placeholder="Ingrese nombre del evento ..."
                name="title"
                value={formValues.title}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={style.form_group}>
              <label className={style.modal_title} >Fecha Inicio</label>
              <DateTimePicker
              className={style.form_input}
                value={startDate}
                onChange={ handleChangeStart}
              />
            </div>
            <div className={style.form_group}>
              <label className={style.modal_title}>
                Fecha de finalizacion
              </label>
              <DateTimePicker
                
                className={style.form_input}
                value={endDate}
                minDate={startDate}
                onChange={handleChangeEnd}
              />
            </div>
            <div className={style.form_group}>
              <label className={style.modal_title}>Notas</label>
              <textarea
              className={style.form_textarea}
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
            onClick={props.closeModal}
          >
            Cerrar
          </button>
        </div>
          </div>
        </div>
       
    </Modal>
  )
}
const mapStateToProps = (state: StoreState): { stateEvent: Event[] } => {
    return {
      stateEvent: state.stateEvent,
    };
  };
  
  export default connect(mapStateToProps, { createEvent, getAllEvents})(NewEvent);
  