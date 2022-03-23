import React,{ useEffect, useRef } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";
import { StoreState, Cheq } from "../../../tools/interface";
import {
  addCheq,
  getCheq,
  deleteCheq,
  filterCheq,
  detailCheq 
} from "../../../redux/actions/Cheqbooks/cheqActions";
import {configDate,formatterPeso} from "../../../tools/formatFunction";
import NewCheq from "./NewCheq";
import DetailCheq from "./DetailCheq";
import style from './ListCheq.module.css'
/*ICONS */
import {FaTrash} from 'react-icons/fa'
import {GrView} from 'react-icons/gr'


interface CheqOwnProps {
  stateCheq: Cheq[];
  addCheq(cheq: Cheq): any;
  getCheq(): any;
  deleteCheq(id: string): any;
  filterCheq(data:string): any;
  detailCheq(id: string): any;

}

function ListCheq(props: CheqOwnProps) {
    
const idRef = useRef("");


  const [change , setChange] = React.useState(false);
  const [filter, setFilter] = React.useState("");
 

console.log("INFO DE STATE", props.stateCheq)

  useEffect(() => {
    if(!change){
      props.getCheq();
    }else{
      props.filterCheq(filter)
    }

  }, [props, change, filter]);

  const typeCheq =  ["Cheque Propio", "Cheque Tercero"]
  const statusCheq = ["Pendiente","Pagado","Cobrado","Vencido","Rechazado","Endosado"]


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

  const viewDetailCheq = (id: string) => {
    idRef.current = id
    props.detailCheq(id);
    openModalDetail()
  }



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
      <div className="fresh-table full-color-orange">
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

        {/* SECTION FILTER */}
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

                {/* SECTION VIEW CHEQ */}
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
                   	    
                      <tr key={cheq._id} className={cheq.type[0] === 'Cheque Propio' ? "table-info" : "table-light"}>
                        <th scope="row" >
                         {cheq.type}{" "}
                        </th>

                        <th scope="row">{configDate(cheq.diferido)}</th>
                        <th scope="row">{configDate(cheq.pago)}</th>
                        <th scope="row">{cheq.banco.toUpperCase()}</th>
                        <th scope="row">{cheq.numero}</th>
                        <th scope="row">{cheq.cliente.toUpperCase()}</th>
                        <th scope="row">{formatterPeso.format(cheq.importe)}</th>
                        <th scope="row" className={cheq.status[0] === 'Pagado' ? "table-success" :  "table-striped"}>{cheq.status}</th>
                        <td className={style.container_actions}>
         
                          
                        <th scope="row">
                           <button type="button"
            className={style.view}
                    onClick={() => viewDetailCheq(cheq._id)}
            ><GrView/></button>
                          </th>
                          {modalDetailCheq ? <DetailCheq idCheq={idRef.current} isChange={change} modal={modalDetailCheq} openModal={openModalDetail} closeModal={closeModalDetail}/> : null}

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
                <span className={style.notfound}>
                  <h5 className={style.message}>No hay cheques</h5>
                </span>
              )}
            </tbody>
          </table>
        </div>
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
  detailCheq,
})(ListCheq);