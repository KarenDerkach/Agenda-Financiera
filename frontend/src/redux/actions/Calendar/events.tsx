import api from "../../../service/api"
import { Dispatch } from 'redux';
import { Event, EventDispatch } from "../../../tools/interface";
import { actionsTypes } from '../types';

export function getAllEvents () {
  return async function(dispatch: Dispatch<EventDispatch>)  {

    const info = localStorage.getItem('token') || '';
    const token = JSON.parse(info);
    const config = {
        headers: {
         "x-access-token": token.token,
       },
      };

    await api.get<Event[]>("/event", config)
      .then(res => {
        dispatch<EventDispatch>({
          type: actionsTypes.getAllEvents,
          payload: res.data
        })
      })
  }
}




export function createEvent (event:any) {
    return async function (dispatch:Dispatch) {

      const info = localStorage.getItem('token') || '';
     
      const token = JSON.parse(info);

      const config = {
          headers: {
           "Content-type": "application/json",
           "x-access-token": token.token,
         },
        };


        await api.post<Event[]>(`/event/newEvent`, event, config)
        
        .then((dataAPI) => {

            dispatch<EventDispatch>({type: actionsTypes.createEvent, payload: dataAPI.data})
        })
    }
}

export function deleteEvent (id:string) {
    return async function (dispatch:Dispatch) {

      const info = localStorage.getItem('token') || '';
      const token = JSON.parse(info);
      const config = {
          headers: {
           "x-access-token": token.token,
         },
        };

        await api.delete<Event[]>(`/event/${id}`, config)
        
        .then((dataAPI) => {

            dispatch<EventDispatch>({type: actionsTypes.deleteEvent, payload: dataAPI.data})
        })
    }
}