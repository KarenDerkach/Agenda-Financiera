import React, {useEffect} from 'react'

import { StoreState, Cheq } from "../../../tools/interface";
import { connect } from "react-redux";
import moment from 'moment';
import Modal from "react-modal";
import swal from 'sweetalert';
import { updateCheq, getCheq} from "../../../redux/actions/Cheqbooks/cheqActions";

import style from './EditCheq.module.css'

interface EditProps {
    stateCheq: Cheq[];
    updateCheq: (id: string, cheq: Cheq) => void;
    getCheq(): any;
    id : string;
    modal: boolean;
    openModal: () => void;
    closeModal: () => void;
    configDate: (date: any) => void;
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
        height: '200px',
     

	},
};

Modal.setAppElement('#root');

/**Fin config */



 function DetailCheq(props: EditProps) {


    const [change, setChange] = React.useState(false);
    useEffect(() => {
        props.getCheq();
    } , [props, change]);

   
    const cheq: any = props.stateCheq.find(cheq => cheq._id === props.id);

  
    const [input, setInput] = React.useState<Cheq>({
    cliente: cheq.cliente,
    banco: cheq.banco,
    numero: cheq.numero,
    status: cheq.status,
    type: cheq.type,
    diferido: cheq.diferido,
    ingreso: cheq.ingreso,
    pago: cheq.pago,
    importe: cheq.importe,
    observacion: cheq.observacion,
    _id: cheq._id,
    })

    const typeCheq =  ["Cheque Propio", "Cheque Tercero"]
    const statusCheq = ["Pendiente","Pagado","Cobrado","Vencido","Rechazado","Endosado"]

    const handleSubmitEdit = (id:string,e: any) => {
      const momentPago_Cobro = moment(input.pago)
    const momentDiferido= moment(input.diferido);
if(momentPago_Cobro.isBefore(momentDiferido)) return swal("Error", "La fecha de pago no puede ser anterior a la fecha de diferido", "error")
if(input.status === ["Pagado"] && input.pago === undefined) return swal("Error", "La fecha de pago no puede ser vacia", "error")
if(input.status === ["Cobrado"] && input.pago === undefined) return swal("Error", "La fecha de cobro no puede ser vacia", "error")
e.preventDefault()
      props.updateCheq(id, input)
      setChange(!change)
     
    }

    const handleSelectStatus = (e: any) => {
      setInput({
        ...input,
        status:[e.target.value]
      })
    }
    const handleSelectType = (e: any) => {
      setInput({
        ...input,
        type:[ e.target.value]
      })
    }
    const handleChangeInput = (e: any) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
    }



  return (
    <div>
      <Modal
        isOpen={props.modal}
        onRequestClose={props.closeModal}
        style={customStyles}
        overlayClassName={style.overlay}
        className={style.modal}
              >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar</h5>
              <button
                type="button"
                className="btn btn-danger"
                onClick={props.closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={()=>handleSubmitEdit}>

              <div className="form-group">
                  <label>Tipo</label>
                  <select onClick={(e)=>handleSelectType(e)}>
                    {
                      typeCheq.map((type: string) => {
                        return (
                          <option key={type} value={type}>{type}</option>
                        )
                      })
                    }
                  </select>
                  <span>({cheq.type})</span>
                </div>

                <div className="form-group">
                  <label>Estado</label>
                  <select onClick={(e)=>handleSelectStatus(e)}>
                    {
                      statusCheq.map((type: string) => {
                        return (
                          <option key={type} value={type}>{type}</option>
                        )
                      })
                    }
                  </select>
                    <span>({cheq.status[0]})</span>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Cliente</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={cheq.cliente}
                    name="cliente"
                    value={input.cliente}
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Banco</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={cheq.banco}
                    name="banco"
                    value={input.banco}
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Numero de cheque
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={cheq.numero}
                    name="numero"
                    value={input.numero}
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Importe</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={cheq.importe}
                    name="importe"
                    value={input.importe}
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Fecha de pago/cobro
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder={cheq.pago}
                    name="pago"
                    value={input.pago}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  <p>({cheq.pago === '' ? '-' : props.configDate(cheq.pago)})</p>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Fecha de diferido
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder={cheq.diferido}
                    name="diferido"
                    value={input.diferido}
                    onChange={(e) => handleChangeInput(e)}
                  />
                    <p>({props.configDate(cheq.diferido)})</p>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Observaciones</label>
                  <textarea
                    className="form-control"
                    placeholder={cheq.observacion}
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
                
                onClick={(e)=>handleSubmitEdit(cheq._id, e)}
            
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

    </div>

    
  )
}

const mapStateToProps = (state: StoreState): { stateCheq: Cheq[] } => {
    return {
      stateCheq: state.stateCheq,
    };
  };
  
export default connect(mapStateToProps, { updateCheq, getCheq})(DetailCheq);