import React, {useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { StoreState, Cheq } from "../../../tools/interface";
import { connect } from "react-redux";
import moment from 'moment';
import swal from 'sweetalert';
import { updateCheq, getCheq} from "../../../redux/actions/Cheqbooks/cheqActions";
import {FaEdit} from 'react-icons/fa'

interface DetailProps {
    stateCheq: Cheq[];
    updateCheq: (id: string, cheq: Cheq) => void;
    getCheq(): any;
  }

 function DetailCheq(props: DetailProps) {
    const [change, setChange] = React.useState(false);
    useEffect(() => {
        props.getCheq();
    } , [props, change]);

    const navigate = useNavigate()
    const { id } = useParams();
    const cheq: any = props.stateCheq.find(cheq => cheq._id === id);

  //FORMATEOS DE LOS DATOS
    function configDate (date: any)  {
      if(date === null || date === undefined) return
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

    /////////////////////////////////Edition Section ////////////////////////////////////////
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
      navigate('/cheques')
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
        <div className="modal" id="modal2">
        <div className="modal-dialog">
          <div className="modal-content">
                  <div className="modal-header">
              <h5 className="modal-title">Cheque Numero {cheq.numero}</h5>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => navigate("/cheques")}
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
                data-toggle="modal"
                data-target="#modal3"
                className="btn btn-outline-warning"
              >
                <span aria-hidden="true"><FaEdit/></span>
              </button>
            </div>  
          </div>
        </div>
      </div>

{/* MODAL EDIT */}
      <div className="modal" id="modal3">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar</h5>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                aria-label="Close"
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
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>

    
  )
}

const mapStateToProps = (state: StoreState): { stateCheq: Cheq[] } => {
    return {
      stateCheq: state.stateCheq,
    };
  };
  
export default connect(mapStateToProps, { updateCheq, getCheq})(DetailCheq);