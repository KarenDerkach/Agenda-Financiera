import React ,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState, Event } from "../../tools/interface";
import { deleteEvent, getAllEvents } from "../../redux/actions/Calendar/events";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import './DetailEvent.css';



export default function DetailEvent() {

  const dispatch = useDispatch();
  const stateEvent = useSelector((state: StoreState) => state.stateEvent);

  useEffect(() => {
   dispatch(getAllEvents());
  }, [dispatch,stateEvent]);

  const handleDelete = (id: string) => {
    dispatch(deleteEvent(id));
  };

  function configDate(date: any) {
    if (date === undefined || date === null) return "-";
    const day: string = date.split("-").pop().split("").slice(0, 2).join("");
    const rest: string[] = date.split("-").slice(0, 2);

    const allDay: string = rest.concat(day).reverse().join("/");
    return allDay;
  }

  return (
    <div>
      <h2>
        <strong>Tus eventos</strong>
      </h2>
      <hr />
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tipo</th>
            <th scope="col">Nombre</th>
            <th scope="col">Fecha Inicio</th>
            <th scope="col">Fecha Fin</th>
            <th scope="col">Notas</th>
          </tr>
        </thead>
        <tbody>
          {stateEvent.length > 0 ? (
           stateEvent.map((data: Event) => {
              return (
                <>
                  <tr>
                    <th scope="row" key={data._id}>
                      {data.type}{" "}
                    </th>

                    <th scope="row">{data.title}</th>
                    <th scope="row">{configDate(data.start)}</th>
                    <th scope="row">{configDate(data.end)}</th>
                    <th scope="row">{data.notes}</th>

                    <th scope="row">
                      <button className="trash" onClick={() => handleDelete(data._id)}>
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                </>
              );
            })
          ) : (
            <tr>
              <td>No hay eventos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <Link to="/calendar">
          {" "}
          <button className="btn btn-dark">Regresar</button>
        </Link>
      </div>
    </div>
  );
}

