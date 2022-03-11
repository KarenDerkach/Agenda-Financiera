import React,
{ useEffect } 
from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { StoreState, Cheq } from "../../../tools/interface";
import {
  addCheq,
  getCheq,
  deleteCheq,
  filterCheq
} from "../../../redux/actions/Cheqbooks/cheqActions";
/*ICONS */

import {FaTrash} from 'react-icons/fa'
import {GrView} from 'react-icons/gr'
import "./NewCheq.css";


interface CheqOwnProps {
  stateCheq: Cheq[];
  addCheq(cheq: Cheq): any;
  getCheq(): any;
  deleteCheq(id: string): any;
  filterCheq(data:string): any;

}

function NewCheq(props: CheqOwnProps) {
  const [change , setChange] = React.useState(false);
  const [filter, setFilter] = React.useState("");
 
  useEffect(() => {
    if(!change){
      props.getCheq();
      
    }else{
      props.filterCheq(filter)
    }
    
  }, [props, filter, change]);

  const typeCheq =  ["Cheque Propio", "Cheque Tercero"]
  const statusCheq = ["Pendiente","Pagado","Cobrado","Vencido","Rechazado","Endosado"]
 
//FORMATEOS
  function configDate (date: any)  {
    if(date === undefined || date === null) return '-'
    const day: string = date.split('-').pop().split('').slice(0,2).join('')
    const rest: string[] = date.split('-').slice(0,2)

    const allDay: string = rest.concat(day).reverse().join('/')
    return allDay
  }
  
  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

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

  const handleDelete = ( id: string) => {
    // console.log("ID QUE RECIBE LA FUNCION DELETE: ",id)
    swal({
      title: "Estas seguro?",
      text: "Una vez eliminado, no podras recuperar este cheque!",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        props.deleteCheq(id);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        setChange(false)
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

  const handleSelect = (e: any) => {
    setInput({
      ...input,
      type: [e.target.value],
    });
  }

  const handleSubmit = (e: any) => {
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
      setChange(false)
    } else {
      swal("Faltan datos", "", "warning");
    }
  };


  //funciones filtrado

  const handleSelectFilter = (e: any) => {
    console.log('ASI LLEGA EL EVENTO FILTRADO: ',e.target.value)
    setFilter(e.target.value);
  }

  const handleClearFilter = () => {
    setFilter("");
    props.getCheq();
  }

  const handleAplyFilter = (e: any) => {
    e.preventDefault();
    props.filterCheq(filter);
    setChange(true);
  }
  return (
    <>
      <div className="container-view">
        <div className="seccion-menu">
        <div className="new-cheq-btn">
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#modal1"
          >
            NUEVO REGISTRO
          </button>
        </div>

        
         <section className="filter-cheq-btn" >
           <div className="title-filter">FILTRAR</div>
         <label>Estado</label>
              <select className='select-option' onClick={(e)=>handleSelectFilter(e)}>
                {
                  statusCheq.map((status: string) => {
                    return (
                      <option key={status} value={status}>{status}</option>
                    )
                  })
                }
              </select>
            <label>Tipo</label>
              <select  className='select-option'onClick={(e)=>handleSelectFilter(e)}>
                {
                  typeCheq.map((type: string) => {
                    return (
                      <option key={type} value={type}>{type}</option>
                    )
                  })

                }
              </select>
              <div className="seccion-btn-filter">
              <button className="btn btn-outline-warning" onClick={handleClearFilter}>Limpiar</button>
            <button className="btn btn-outline-success" onClick={(e)=>handleAplyFilter(e)}>Aplicar</button>
            </div>
         </section>
         </div>

        <div className="detail-ownCheq">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Tipo</th>
                <th scope="col">F.Diferido</th>
                <th scope="col">F.Cobro/Pago</th>
                <th scope="col">Banco</th>
                <th scope="col">Numero</th>
                <th scope="col">Cliente</th>
                <th scope="col">Importe</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {props.stateCheq.length > 0 ? (
                props.stateCheq.map((cheq: Cheq) => {
                  return (
                    <>
                   	
                      <tr>
                        <th scope="row" key={cheq._id}>
                          {cheq.type}{" "}
                        </th>

                        <th scope="row">{configDate(cheq.diferido)}</th>
                        <th scope="row">{configDate(cheq.pago)}</th>
                        <th scope="row">{cheq.banco.toUpperCase()}</th>
                        <th scope="row">{cheq.numero}</th>
                        <th scope="row">{cheq.cliente.toUpperCase()}</th>
                        <th scope="row">{formatterPeso.format(cheq.importe)}</th>
                        <th scope="row">{cheq.status}</th>
                        <td className="container-actions">
         
                          <Link to={`/cheq/${cheq._id}`}>   
                        <th scope="row">
                           <button type="button"
            className="view"
            data-toggle="modal"
            data-target="#modal2"><GrView/></button>
                          </th>
                          </Link>

                          <th scope="row">
                            <button  className='trash'onClick={() => handleDelete(cheq._id)}>
                             <FaTrash/>
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
                  <label>Tipo</label>
                  <select onClick={(e)=>handleSelect(e)}>
                    {
                      typeCheq.map((type: string) => {
                        return (
                          <option key={type} value={type}>{type}</option>
                        )
                      })
                    }
                  </select>
                </div>
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

      {/* MODAL DETALLE CHEQ */}
    
   

     
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
  deleteCheq,
  filterCheq,
})(NewCheq);
