import api from "../../../service/api"
import { Dispatch } from 'redux';
import { Event, EventDispatch } from "../../../tools/interface";
import { actionsTypes } from '../types';

export function getAllEvents () {
  return async function(dispatch: Dispatch<EventDispatch>)  {
    await api.get<Event[]>("/event")
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
        await api.post<Event[]>(`/event/newEvent`, event)
        
        .then((dataAPI) => {

            dispatch<EventDispatch>({type: actionsTypes.createEvent, payload: dataAPI.data})
        })
    }
}

export function deleteEvent (id:string) {
    return async function (dispatch:Dispatch) {
        await api.delete<Event[]>(`/event/${id}`)
        
        .then((dataAPI) => {

            dispatch<EventDispatch>({type: actionsTypes.deleteEvent, payload: dataAPI.data})
        })
    }
}