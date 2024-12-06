import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import moment from "moment";
import swal from "sweetalert";
import { Event } from "../../tools/interface";
import { createEvent } from "../../redux/actions/Calendar/events";
import "react-datepicker/dist/react-datepicker.css";
import style from "./NewEvent.module.css";

interface EventProps {
  modal: boolean;
  openModal(): any;
  closeModal(): any;
}

/* Inicio Conf Modal */
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#f8f9fa",
    border: "none",
    with: "100vw",
    height: "100vh",
  },
};

Modal.setAppElement("#root");

/* Fin config modal */

let now = moment().minutes(0).seconds(0).add(1, "hours");
let nowPlusOne = now.clone().add(1, "hours");

const initEvent: Event = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlusOne.toDate(),
  type: [],
  _id: "",
};

export default function NewEvent(props: EventProps) {
  const dispatch = useDispatch();

  const [formValues, setformValues] = useState(initEvent);

  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowPlusOne.toDate());

  const typeEvent = ["Cumpleaños", "Reunion", "Trabajo", "Tareas", "Otros"];

  /**FUNCTIONS */
  const handleChangeStart = (e: any) => {
    setStartDate(e);
    setformValues({ ...formValues, start: e });
  };

  const handleChangeEnd = (e: any) => {
    setEndDate(e);
    setformValues({ ...formValues, end: e });
  };

  const handleSelectType = (e: any) => {
    setformValues({
      ...formValues,
      type: [e.target.value],
    });
  };

  //title, notas
  const handleChange = (e: any) => {
    setformValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    const momentStart = moment(formValues.start);
    const momentEnd = moment(formValues.end);

    if (momentStart.isAfter(momentEnd))
      return swal(
        "Error",
        "La fecha de inicio no puede ser anterior a la fecha de fin",
        "error"
      );
    if (formValues.title !== "" && formValues.start && formValues.end) {
      e.preventDefault();
      dispatch(createEvent(formValues));
      swal({ title: "Evento creado", icon: "success" });
      setformValues(initEvent);
      props.closeModal();
    } else {
      swal("Error", "Complete los campos requeridos", "error");
    }
  };

  return (
    <Modal
      isOpen={props.modal}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName="overlay"
      className="modal"
    >
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
      <div className={style.container}>
        <form
          className={style.container_form}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-floating">
            <select
              className="form-select"
              onClick={(e) => handleSelectType(e)}
            >
              {typeEvent.map((type: string, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
            <label htmlFor="floatingSelect">Tipo</label>
          </div>
          <div className="form-group">
            <label className={style.modal_title}>Titulo</label>
            <input
              className="form-control"
              type="text"
              placeholder="Ingrese nombre del evento ..."
              name="title"
              value={formValues.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label className={style.modal_title}>Fecha Inicio</label>

            <input
              type="date"
              className="form-control"
              value={moment(startDate).format("YYYY-MM-DD")}
              onChange={(e) => handleChangeStart(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className={style.modal_title}>Fecha de finalizacion</label>

            <input
              type="date"
              className="form-control"
              value={moment(endDate).format("YYYY-MM-DD")}
              min={moment(startDate).format("YYYY-MM-DD")}
              onChange={(e) => handleChangeEnd(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className={style.modal_title}>Notas</label>
            <textarea
              className="form-control"
              placeholder="datos adicionales ..."
              name="notes"
              value={formValues.notes}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </form>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e)}
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
    </Modal>
  );
}
