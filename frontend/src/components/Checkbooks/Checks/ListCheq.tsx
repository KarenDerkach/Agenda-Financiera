import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import swal from "sweetalert";
import { StoreState, Cheq } from "../../../tools/interface";
import {
  //addCheq,
  getCheq,
  deleteCheq,
  filterCheq,
  detailCheq,
} from "../../../redux/actions/Cheqbooks/cheqActions";
import { configDate, formatterPeso } from "../../../tools/formatFunction";
import NewCheq from "./NewCheq";
import DetailCheq from "./DetailCheq";
import style from "./ListCheq.module.css";
/*ICONS */
import { FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";

export default function ListCheq() {
  const idRef = useRef("");

  const stateCheq = useSelector((state: StoreState) => state.stateCheq);
  const dispatch = useDispatch();

  const [change, setChange] = React.useState(false);
  const [filter, setFilter] = React.useState("");

  useEffect(() => {
    dispatch(getCheq());
  }, [dispatch, change]);

  const typeCheq = ["Cheque Propio", "Cheque Tercero"];
  const statusCheq = [
    "Pendiente",
    "Pagado",
    "Cobrado",
    "Vencido",
    "Rechazado",
    "Endosado",
  ];

  const handleDelete = (id: string) => {
    swal("Estas seguro?", {
      dangerMode: true,
      buttons: [true, "Eliminar"],
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCheq(id));
        setChange(!change);
      } else {
        swal("Cheque salvado!");
      }
    });
  };

  const viewDetailCheq = (id: string) => {
    idRef.current = id;
    dispatch(detailCheq(id));
    openModalDetail();
  };

  const handleSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleClearFilter = () => {
    setFilter("");
    dispatch(getCheq());
    setChange(false);
  };

  const handleAplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(filterCheq(filter));
    setChange(true);
  };

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
              {modalNewCheq && (
                <NewCheq
                  isChange={setChange}
                  modal={modalNewCheq}
                  openModal={openModalNew}
                  closeModal={closeModalNew}
                />
              )}
            </div>

            <section className={style.filter_cheq_btn}>
              <div className={style.title_filter}>FILTRAR</div>
              <label>Estado</label>
              <select
                className={style.select_option}
                onChange={handleSelectFilter}
              >
                {statusCheq.map((status: string) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <label>Tipo</label>
              <select
                className={style.select_option}
                onChange={handleSelectFilter}
              >
                {typeCheq.map((type: string) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className={style.seccion_btn_filter}>
                <button
                  className="btn btn-outline-warning"
                  onClick={handleClearFilter}
                >
                  Limpiar
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={handleAplyFilter}
                >
                  Aplicar
                </button>
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
                {stateCheq.length > 0 ? (
                  stateCheq.map((cheq: Cheq) => (
                    <tr
                      key={cheq._id}
                      className={
                        cheq.type[0] === "Cheque Propio"
                          ? "table-info"
                          : "table-light"
                      }
                    >
                      <td>{cheq.type}</td>
                      <td>{configDate(cheq.diferido)}</td>
                      <td>{configDate(cheq.pago)}</td>
                      <td>{cheq.banco.toUpperCase()}</td>
                      <td>{cheq.numero}</td>
                      <td>{cheq.cliente.toUpperCase()}</td>
                      <td>{formatterPeso.format(cheq.importe)}</td>
                      <td
                        className={
                          cheq.status[0] === "Pagado"
                            ? "table-success"
                            : "table-striped"
                        }
                      >
                        {cheq.status}
                      </td>
                      <td className={style.container_actions}>
                        <button
                          type="button"
                          className={style.view}
                          onClick={() => viewDetailCheq(cheq._id)}
                        >
                          <GrView />
                        </button>
                        {modalDetailCheq && (
                          <DetailCheq
                            idCheq={idRef.current}
                            isChange={change}
                            modal={modalDetailCheq}
                            openModal={openModalDetail}
                            closeModal={closeModalDetail}
                          />
                        )}
                        <button
                          className={style.trash}
                          onClick={() => handleDelete(cheq._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className={style.notfound}>
                      <h5 className={style.message}>No hay cheques</h5>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
