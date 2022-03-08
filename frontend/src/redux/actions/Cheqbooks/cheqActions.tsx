import axios from "axios"
import { Dispatch } from 'redux';
import { OwnCheq, OwnCheqDispatch } from "../../../tools/interface";
import { actionsTypes } from '../types';

export function addOwnCheq (cheq:any) {
    return async function (dispatch:Dispatch) {
        await axios.post<OwnCheq[]>(`http://localhost:3001/OwnCheq/newCheq`, cheq)
        
        .then((dataAPI) => {

            dispatch<OwnCheqDispatch>({type: actionsTypes.addOwnCheq, payload: dataAPI.data})
        })
    }
}

export function getOwnCheq () {
    return async function (dispatch:Dispatch) {
        await axios.get<OwnCheq[]>('http://localhost:3001/owncheq/listCheq')
        .then((dataAPI) => {
  
            dispatch<OwnCheqDispatch>({type: actionsTypes.getAllOwnCheq, payload: dataAPI.data})
        })
    }
}

export function deleteOwnCheq (id:string) {
    return async function (dispatch:Dispatch) {
        await axios.delete<OwnCheq[]>(`http://localhost:3001/owncheq/deleteCheq/${id}`)	
        .then((dataAPI) => {
  
            dispatch<OwnCheqDispatch>({type: actionsTypes.deleteOwnCheq, payload: dataAPI.data})
        })
    }
}


export function updateOwnCheq (id: string , cheq:OwnCheq) {
    return async function (dispatch:Dispatch) {
        await axios.put<OwnCheq[]>(`http://localhost:3001/owncheq/updateCheq/${id}`, cheq)
        .then((dataAPI) => {
         
            dispatch<OwnCheqDispatch>({type: actionsTypes.updateOwnCheq, payload: dataAPI.data})
        })
    }
}