import React from 'react'
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {updateCheq} from '../../../redux/actions/Cheqbooks/cheqActions'
import { StoreState, Cheq } from "../../../tools/interface";
//import swal from "sweetalert";

interface CheqProps {
    stateCheq: Cheq[];

  
  }

 function UpdateCheq(props: CheqProps) {
    
    let {_id} = useParams();
    console.log("ID QUE RECIBE useParams: ",_id)

    // const [input, setInput] = React.useState<OwnCheq>({
    //     cliente: "",
    //     banco: "",
    //     numero: 0,
    //     status: [],
    //     diferido: "",
    //     ingreso: "",
    //     pago: "",
    //     importe: 0,
    //     observacion: "",
    //     _id: "",

    // })

    // useEffect(() => {
    //     props.updateOwnCheq(id,input)
    // }, [input,props, id]);
    

    //   const handleChangeInput = (e: any) => {
    //     setInput({
    //       ...input,
    //       [e.target.name]: e.target.value,
    //     });
    //   };

    //   const handleSubmit = (e: any) => {
       
    //       e.preventDefault();
    //       props.updateOwnCheq(input);
    //       setInput({
    //         cliente: "",
    //         banco: "",
    //         numero: 0,
    //         status: [],
    //         diferido: "",
    //         pago: "",
    //         ingreso: "",
    //         importe: 0,
    //         observacion: "",
    //         _id: "",
    //       });
    //       swal("Cheq editado", "", "success");
    //     } 
    

  return (
    <div>

        HOLAAAA
         {/* MODAL EDITAR CHEQ */}
      {/* <div className="modal" id="modal2">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cheque N° ${}</h5>
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
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Cliente</label>
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
                  <label htmlFor="exampleInputEmail1">Banco</label>
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
                  <label htmlFor="exampleInputPassword1">
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
                  <label htmlFor="exampleInputPassword1">Importe</label>
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
                  <label htmlFor="exampleInputPassword1">
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
                  <label htmlFor="exampleInputPassword1">
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
                  <label htmlFor="exampleInputPassword1">Observaciones</label>
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
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
  const mapStateToProps = (state: StoreState): { stateCheq: Cheq[] } => {
    return {
      stateCheq: state.stateCheq,
    };
  };

  export default connect(mapStateToProps, {updateCheq})(UpdateCheq);