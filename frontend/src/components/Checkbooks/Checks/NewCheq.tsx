import React
 
from "react";

import { connect } from "react-redux";
import Modal from "react-modal";
import swal from "sweetalert";
import moment from "moment";
import { StoreState, Cheq } from "../../../tools/interface";
import {
  addCheq,
  getCheq,
} from "../../../redux/actions/Cheqbooks/cheqActions";

//import style from './NewCheq.module.css'


interface CheqOwnProps {
  stateCheq: Cheq[];
  addCheq(cheq: Cheq): any;
  getCheq(): any;
  isChange: boolean;
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
        with: '100vw',
        height: '100vh',
     

	},
};

Modal.setAppElement('#root');

/**Fin config */

function NewCheq(props: CheqOwnProps) {

 
  const typeCheq =  ["Cheque Propio", "Cheque Tercero"]

 
/////////////////////////////////////////////////////////////////////////////////
  const [input, setInput] = React.useState<Cheq>({
    cliente: "",
    banco: "",
    numero: 0,
    status: ["Pendiente"],
    type: [],
    diferido: '',
    ingreso: '',
    pago: '',
    importe: 0,
    observacion: "",
    _id: "",
  });


  const handleChangeInput = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e: any) => {
    setInput({
      ...input,
      type: [e.target.value],
    });
  }

  const handleSubmit = (e: any) => {

    const momentEmision = moment(input.ingreso);
    const momentDiferido= moment(input.diferido);

    if(momentEmision.isAfter(momentDiferido)) return swal("La fecha de diferido no puede ser  a la fecha de ingreso")
    if (
      input.cliente !== "" &&
      input.banco !== "" &&
      input.numero !== 0 &&
      input.diferido !== "" &&
      input.importe !== 0
    ) {
      e.preventDefault();
      props.addCheq(input);
      setInput({
        cliente: "",
        banco: "",
        numero: 0,
        status: [],
        type: [],
        diferido: "",
        pago: "",
        ingreso: "",
        importe: 0,
        observacion: "",
        _id: "",
      });
      swal("Cheq creado", "", "success");
      props.isChange = true;
    } else {
      swal("Faltan datos", "", "warning");
    }
  };

  return (
    <>
     <Modal
        isOpen={props.modal}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName='overlay'
        className='modal'
              >
      
      
         
            <div className="modal-header">
              <h5 className="modal-title">Nuevo cheque</h5>
              <button
                type="button"
                className="btn btn-danger"
                onClick={props.closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
              <div className="form-floating">
                  <select className='form-select' aria-label='Floating label select example'onClick={(e)=>handleSelect(e)}>
                   
                    {
                      typeCheq.map((type: string) => {
                        return (
                          <option key={type} value={type}>{type}</option>
                          )
                      })
                    }
                  </select>
                    <label htmlFor="floatingSelect">Tipo</label>
                </div>
                <div className="form-group">
                  <label >Cliente</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre.."
                    name="cliente"
                    value={input.cliente}
                    onChange={(e) => handleChangeInput(e)}
                    
                  />
                </div>
                <div className="form-group">
                  <label >Banco</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre.."
                    name="banco"
                    value={input.banco}
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
                <div className="form-group">
                  <label >
                    Numero de cheque
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Numero de cheque"
                    name="numero"
                    value={input.numero}
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
                <div className="form-group">
                  <label >Importe</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="2000.."
                    name="importe"
                    value={input.importe}
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Fecha de emision
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="20/02/2022.."
                    name="ingreso"
                    value={input.ingreso}
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
                <div className="form-group">
                  <label >
                    Fecha de diferido
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="20/03/2022.."
                    name="diferido"
                    value={input.diferido}
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
                <div className="form-group">
                  <label >Observaciones</label>
                  <textarea
                    className="form-control"
                  
                    placeholder="..."
                    name="observacion"
                    value={input.observacion}
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Guardar
              </button>
            </div>
         
        
  
      </Modal>
    </>
  );
}

const mapStateToProps = (state: StoreState): { stateCheq: Cheq[] } => {
  return {
    stateCheq: state.stateCheq,
  };
};

export default connect(mapStateToProps, {
  addCheq,
  getCheq,
})(NewCheq);
