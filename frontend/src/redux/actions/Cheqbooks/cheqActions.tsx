import axios from "axios"
import { Dispatch } from 'redux';
import { Cheq, CheqDispatch } from "../../../tools/interface";
import { actionsTypes } from '../types';

export function addCheq (cheq:any) {
    return async function (dispatch:Dispatch) {
        await axios.post<Cheq[]>(`http://localhost:3001/cheq/newCheq`, cheq)
        
        .then((dataAPI) => {

            dispatch<CheqDispatch>({type: actionsTypes.addCheq, payload: dataAPI.data})
        })
    }
}

export function getCheq () {
    return async function (dispatch:Dispatch) {
        await axios.get<Cheq[]>('http://localhost:3001/cheq/listCheq')
        .then((dataAPI) => {
  
            dispatch<CheqDispatch>({type: actionsTypes.getAllCheq, payload: dataAPI.data})
        })
    }
}

export function deleteCheq (id:string) {
    return async function (dispatch:Dispatch) {
        await axios.delete<Cheq[]>(`http://localhost:3001/cheq/deleteCheq/${id}`)	
        .then((dataAPI) => {
  
            dispatch<CheqDispatch>({type: actionsTypes.deleteCheq, payload: dataAPI.data})
        })
    }
}


export function updateCheq (id: string , cheq:Cheq) {
    console.log('ASI LLEGA LA DATAA: ', cheq , id)
    return async function (dispatch:Dispatch) {
        await axios.put<Cheq[]>(`http://localhost:3001/cheq/updateCheq/${id}`, cheq)
        .then((dataAPI) => {
         
            dispatch<CheqDispatch>({type: actionsTypes.updateCheq, payload: dataAPI.data})
        })
    }
}

export function detailCheq (id: string) {
    return async function (dispatch:Dispatch) {
        await axios.get<Cheq[]>(`http://localhost:3001/cheq/detailCheq/${id}`)
        .then((dataAPI) => {
  
            dispatch<CheqDispatch>({type: actionsTypes.detailCheq, payload: dataAPI.data})
        })
    }
}

export function filterCheq (data:string) {
    console.log("data: ",data)
    return async function (dispatch:Dispatch) {
        await axios.get<Cheq[]>(`http://localhost:3001/cheq/cheq?filter=${data}`)
        .then((dataAPI) => {
            dispatch<CheqDispatch>({type: actionsTypes.filterCheq, payload: dataAPI.data})
        })
    }
}