import React,
{ useEffect } 
from "react";

import { connect } from "react-redux";
import swal from "sweetalert";
import { StoreState, Cheq } from "../../../tools/interface";
import {
  addCheq,
  getCheq,
  deleteCheq,
  filterCheq
} from "../../../redux/actions/Cheqbooks/cheqActions";
import NewCheq from "./NewCheq";
import style from './ListCheq.module.css'
/*ICONS */
import {FaTrash} from 'react-icons/fa'
import {GrView} from 'react-icons/gr'
import DetailCheq from "./DetailCheq";


interface CheqOwnProps {
  stateCheq: Cheq[];
  addCheq(cheq: Cheq): any;
  getCheq(): any;
  deleteCheq(id: string): any;
  filterCheq(data:string): any;

}

function ListCheq(props: CheqOwnProps) {
    
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
/////////////////////////////////////////////////////////////////////////////////


  const handleDelete = ( id: string) => {
    // console.log("ID QUE RECIBE LA FUNCION DELETE: ",id)
    swal("Estas seguro?", {
      dangerMode: true,
      buttons: [true, "Eliminar"],
    }).then((willDelete) => {
      if (willDelete) {
        props.deleteCheq(id);
        setChange(false)
      } else {
        swal("Cheque salvado!");
      }
    });
  };




  //funciones filtrado

  const handleSelectFilter = (e: any) => {
  //  console.log('ASI LLEGA EL EVENTO FILTRADO: ',e.target.value)
    setFilter(e.target.value);
  }

  const handleClearFilter = () => {
    setFilter("");
    props.getCheq();
    setChange(false)
  }

  const handleAplyFilter = (e: any) => {
    e.preventDefault();
    props.filterCheq(filter);
    setChange(true);
  }

   /*CONFIG MODAL*/

   const [modalNewCheq, setModalNewCheq] = React.useState(false);
    const [modalDetailCheq, setModalDetailCheq] = React.useState(false);

   function openModalNew() {
    setModalNewCheq(true);

   }
   function openModalDetail() {
    setModalDetailCheq(true);
    
   }
 
 
   function closeModalNew() {
    setModalNewCheq(false);
   }
   function closeModalDetail() {
    setModalDetailCheq(false);
   }
 
   /////////////////////////////////////////
  return (
    <>

      <div className={style.container_view}>
        <div className={style.seccion_menu}>
        <div className={style.new_cheq_btn}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={openModalNew}
          >
            NUEVO REGISTRO
          </button>
          {modalNewCheq ? <NewCheq isChange={change} modal={modalNewCheq} openModal={openModalNew} closeModal={closeModalNew}/> : null}
        </div>

        
         <section className={style.filter_cheq_btn} >
           <div className={style.title_filter}>FILTRAR</div>
         <label>Estado</label>
              <select className={style.select_option} onClick={(e)=>handleSelectFilter(e)}>
                {
                  statusCheq.map((status: string) => {
                    return (
                      <option key={status} value={status}>{status}</option>
                    )
                  })
                }
              </select>
            <label>Tipo</label>
              <select  className={style.select_option} onClick={(e)=>handleSelectFilter(e)}>
                {
                  typeCheq.map((type: string) => {
                    return (
                      <option key={type} value={type}>{type}</option>
                    )
                  })

                }
              </select>
              <div className={style.seccion_btn_filter} >
              <button className="btn btn-outline-warning" onClick={handleClearFilter}>Limpiar</button>
            <button className="btn btn-outline-success" onClick={(e)=>handleAplyFilter(e)}>Aplicar</button>
            </div>
         </section>
         </div>

        <div className={style.detail_ownCheq}>
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
                        <td className={style.container_actions}>
         
                          
                        <th scope="row">
                           <button type="button"
            className={style.view}
                    onClick={openModalDetail}
            ><GrView/></button>
                          </th>
                          {modalDetailCheq ? <DetailCheq id={cheq._id} isChange={change} modal={modalDetailCheq} openModal={openModalDetail} closeModal={closeModalDetail}/> : null}

                          <th scope="row">
                            <button  className={style.trash} onClick={() => handleDelete(cheq._id)}>
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
})(ListCheq);