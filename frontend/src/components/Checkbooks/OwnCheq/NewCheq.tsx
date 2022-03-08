import React,
{ useEffect } 
from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { StoreState, OwnCheq } from "../../../tools/interface";
import {
  addOwnCheq,
  getOwnCheq,
  deleteOwnCheq
} from "../../../redux/actions/Cheqbooks/cheqActions";
import "./OwnCheq.css";

interface CheqOwnProps {
  stateOwnCheq: OwnCheq[];
  addOwnCheq(cheq: OwnCheq): any;
  getOwnCheq(): any;
  deleteOwnCheq(id: string): any;
}

function NewCheq(props: CheqOwnProps) {
 //formato fecha
  // var today :any = new Date();
	// var dd : any = today.getDate();
	// var mm :any= today.getMonth() + 1;
	// var yyyy = today.getFullYear();
	// if (dd < 10) {
	// 	dd = '0' + dd;
	// }
	// if (mm < 10) {
	// 	mm = '0' + mm;
	// }
	// today =dd + '-' + mm + '-' + yyyy;
 
  useEffect(() => {
    props.getOwnCheq();
    console.log("useEffect: ", props.stateOwnCheq);
  }, [props]);

  const [input, setInput] = React.useState<OwnCheq>({
    cliente: "",
    banco: "",
    numero: 0,
    status: ["Pendiente"],
    diferido: '',
    ingreso: '',
    pago: '',
    importe: 0,
    observacion: "",
    _id: "",
  });

  const handleDelete = ( id: string) => {
    // console.log("ID QUE RECIBE LA FUNCION DELETE: ",id)
    swal({
      title: "Estas seguro?",
      text: "Una vez eliminado, no podras recuperar este cheque!",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        props.deleteOwnCheq(id);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const handleChangeInput = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    if (
      input.cliente !== "" &&
      input.banco !== "" &&
      input.numero !== 0 &&
      input.diferido !== "" &&
      input.importe !== 0
    ) {
      e.preventDefault();
      props.addOwnCheq(input);
      setInput({
        cliente: "",
        banco: "",
        numero: 0,
        status: [],
        diferido: "",
        pago: "",
        ingreso: "",
        importe: 0,
        observacion: "",
        _id: "",
      });
      swal("Cheq creado", "", "success");
    } else {
      swal("Faltan datos", "", "warning");
    }
  };

  return (
    <>
      <div className="container-view">
        <div className="new-cheq-btn">
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#modal1"
          >
            ADD
          </button>
        </div>

        <div className="detail-ownCheq">
          <h2>LIST CHEQUES</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">F.Diferido</th>
                <th scope="col">F.Cobro</th>
                <th scope="col">Banco</th>
                <th scope="col">Numero</th>
                <th scope="col">Cliente</th>
                <th scope="col">Importe</th>
                <th scope="col">Estado</th>
                <th scope="col">Observaciones</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {props.stateOwnCheq.length > 0 ? (
                props.stateOwnCheq.map((cheq: OwnCheq) => {
                  return (
                    <>
                   	
                      <tr>
                        <th scope="row" key={cheq._id}>
                          {cheq.diferido}{" "}
                        </th>

                        <th scope="row">{cheq.pago}</th>
                        <th scope="row">{cheq.banco}</th>
                        <th scope="row">{cheq.numero}</th>
                        <th scope="row">{cheq.cliente}</th>
                        <th scope="row">{cheq.importe}</th>
                        <th scope="row">{cheq.status}</th>
                        <th scope="row">{cheq.observacion}</th>
                        <td className="container-actions">
                        <Link to={`/cheq/${cheq._id}`}> 
                        <th scope="row">
                           <button type="button"
            className="btn btn-secondary"
            data-toggle="modal"
            data-target="#modal2">Editar</button>
                          </th>
                          </Link>
                          <th scope="row">
                            <button onClick={() => handleDelete(cheq._id)}>
                              Eliminar
                            </button>
                          </th>
                        </td>
                      </tr>
                 
                    </>
                  );
                })
              ) : (
                <tr>
                  <td>No hay cheques</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* MODAL CREAR CHEQ */}
      <div className="modal" id="modal1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nuevo cheque</h5>
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
      </div>



     
    </>
  );
}

const mapStateToProps = (state: StoreState): { stateOwnCheq: OwnCheq[] } => {
  return {
    stateOwnCheq: state.stateOwnCheq,
  };
};

export default connect(mapStateToProps, {
  addOwnCheq,
  getOwnCheq,
  deleteOwnCheq,
})(NewCheq);
