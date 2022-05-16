import React,{ useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import swal from "sweetalert";
import { StoreState, Cheq } from "../../../tools/interface";
import {
  //addCheq,
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




export default function ListCheq() {
    
const idRef = useRef("");

const stateCheq = useSelector((state: StoreState) => state.stateCheq);
const dispatch = useDispatch();

  const [change , setChange] = React.useState(false);
  const [filter, setFilter] = React.useState("");
 

// console.log("INFO DE STATE", props.stateCheq)

  useEffect(() => {
    if(change===false){
      dispatch(getCheq());
    }else{
      dispatch(filterCheq(filter))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, filter, stateCheq]);

  // useEffect(() => {
  //   dispatch(getCheq());
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // } , [stateCheq]);


  

  const typeCheq =  ["Cheque Propio", "Cheque Tercero"]
  const statusCheq = ["Pendiente","Pagado","Cobrado","Vencido","Rechazado","Endosado"]


  const handleDelete = ( id: string) => {
    // console.log("ID QUE RECIBE LA FUNCION DELETE: ",id)
    swal("Estas seguro?", {
      dangerMode: true,
      buttons: [true, "Eliminar"],
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCheq(id));
        //setChange(true)
      } else {
        swal("Cheque salvado!");
      }
    });
  };

  const viewDetailCheq = (id: string) => {
    idRef.current = id
    dispatch(detailCheq(id));
    openModalDetail()
    //setChange(false)
  }



  //funciones filtrado

  const handleSelectFilter = (e: any) => {
  //  console.log('ASI LLEGA EL EVENTO FILTRADO: ',e.target.value)
    setFilter(e.target.value);
  }

  const handleClearFilter = () => {
    setFilter("");
    dispatch(getCheq());
    setChange(false)
  }

  const handleAplyFilter = (e: any) => {
    e.preventDefault();
    dispatch(filterCheq(filter));
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
          {modalNewCheq ? <NewCheq isChange={setChange} modal={modalNewCheq} openModal={openModalNew} closeModal={closeModalNew}/> : null}
        </div>

        {/* SECTION FILTER */}
         <section className={style.filter_cheq_btn} >
           <div className={style.title_filter}>FILTRAR</div>
         <label>Estado</label>
              <select className={style.select_option} onClick={handleSelectFilter}>
                {
                  statusCheq.map((status: string) => {
                    return (
                      <option key={status} value={status}>{status}</option>
                    )
                  })
                }
              </select>
            <label>Tipo</label>
              <select  className={style.select_option} onClick={handleSelectFilter}>
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
            <button className="btn btn-outline-success" onClick={handleAplyFilter}>Aplicar</button>
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
              {stateCheq.length > 0 ? (
                stateCheq.map((cheq: Cheq) => {
                  return (
                    <>
                    {/* reemplazar th por td */}
                   	    
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



