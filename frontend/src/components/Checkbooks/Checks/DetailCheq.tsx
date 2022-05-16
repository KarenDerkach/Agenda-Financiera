import React from 'react'
import { StoreState, Cheq } from "../../../tools/interface";
import { connect } from "react-redux";
import Modal from "react-modal";
import { detailCheq } from '../../../redux/actions/Cheqbooks/cheqActions';
import {configDate,formatterPeso} from '../../../tools/formatFunction'
import {FaEdit} from 'react-icons/fa'
import EditCheq from './EditCheq';

interface DetailProps {
    stateCheq: Cheq[];
    detailCheq(id: string): any;
    idCheq : string;
    isChange: boolean;
    modal: boolean;
    openModal: () => void;
    closeModal: () => void;
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
        height: '80vh',
        
     

	},
};

Modal.setAppElement('#root');

/**Fin config */



 function DetailCheq(props: DetailProps) {
  

    const cheq: any = props.stateCheq.find(cheq => cheq._id === props.idCheq);
    // console.log("CHEQ ID POR PROPS", props.idCheq)
    // console.log("INFO QUE VIENE CON EL ID", cheq)



    //CONFIG MODAL
    const [isOpen, setIsOpen] = React.useState(false);
   

   function openModal() {
    setIsOpen(true);

   }
 
 
   function closeModal() {
    setIsOpen(false);
   }

 //FIN CONFIG MODAL



  return (
    <div>
      <Modal
        isOpen={props.modal}
        onRequestClose={props.closeModal}
        style={customStyles}
        overlayClassName='overlay'
        className='modal'
              >
          <div className="modal-content">
                  <div className="modal-header">
              <h5 className="modal-title">Cheque Numero {cheq.numero}</h5>
              <button
                type="button"
                className="btn btn-danger"
                onClick={props.closeModal}
                
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body"> 
                        <p>Tipo: {cheq.type[0]}</p>
                        <p>Estado: {cheq.status[0]}</p>
                        <p>Cliente: {cheq.cliente}</p>
                        <p>Banco: {cheq.banco}</p>
                        <p>Numero: {cheq.numero}</p>
                        <p>Importe: {formatterPeso.format(cheq.importe)}</p>
                        <p>Fecha de emision: {configDate(cheq.ingreso)}</p>
                        <p>Fecha de diferido: {configDate(cheq.diferido)}</p>
                        <p>Fecha Pago/Cobro : {configDate(cheq.pago)}</p>
                        <p>Observaciones: {cheq.observacion}</p>
            </div>   
            <div className="modal-footer">
              <button
                type="button"
                onClick={openModal}
                className="btn btn-outline-warning"
              >
                <span aria-hidden="true"><FaEdit/></span>
              </button>
              {isOpen ? <EditCheq configDate={configDate}id={cheq._id} modal={isOpen}  openModal={openModal} closeModal={closeModal}/> : null}
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
  
export default connect(mapStateToProps, {detailCheq})(DetailCheq);