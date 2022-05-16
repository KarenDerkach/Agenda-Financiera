import api from "../../../service/api"
import { Dispatch } from 'redux';
import { Cheq, CheqDispatch } from "../../../tools/interface";
import { actionsTypes } from '../types';

export function addCheq (cheq:any) {
    return async function async (dispatch:Dispatch) {
        try{
            const info = localStorage.getItem('token') || '';
            const token = JSON.parse(info);
            const config = {
                headers: {
                 "Content-type": "application/json",
                 "x-access-token": token.token,
               },
              };
            const data = await api.post<Cheq[]>(`/cheq/newCheq`, cheq, config)
            dispatch<CheqDispatch>({type: actionsTypes.addCheq, payload: data.data})
        }
        catch(err){
            console.log(err)
            window.alert("Error al crear cheque, debes registrarte")
        }
    }
}

export function getCheq () {
    return async function (dispatch:Dispatch) {
        try{
            const info = localStorage.getItem('token') || '';
            const token = JSON.parse(info);
            const config = {
                headers: {
                 "x-access-token": token.token,
               },
              };
    
            await api.get<Cheq[]>('/cheq/listCheq',config)
            .then((dataAPI) => {
      
                dispatch<CheqDispatch>({type: actionsTypes.getAllCheq, payload: dataAPI.data})
            })

        }
        catch(error){
            console.log(error)
        }
    }
}

export function deleteCheq (id:string) {
    return async function (dispatch:Dispatch) {
        const info = localStorage.getItem('token') || '';
        const token = JSON.parse(info);
        const config = {
            headers: {
             "x-access-token": token.token,
           },
          };

        await api.delete<Cheq[]>(`/cheq/deleteCheq/${id}`,config)	
        .then((dataAPI) => {
  
            dispatch<CheqDispatch>({type: actionsTypes.deleteCheq, payload: dataAPI.data})
        })
    }
}


export function updateCheq (id: string , cheq:Cheq) {
    // console.log('ASI LLEGA LA DATAA: ', cheq , id)
    return async function (dispatch:Dispatch) {
        const info = localStorage.getItem('token') || '';
        const token = JSON.parse(info);
        const config = {
            headers: {
                "Content-type": "application/json",
             "x-access-token": token.token,
           },
          };


        await api.put<Cheq[]>(`/cheq/updateCheq/${id}`, cheq, config)
        .then((dataAPI) => {
         
            dispatch<CheqDispatch>({type: actionsTypes.updateCheq, payload: dataAPI.data})
        })
    }
}

export function detailCheq (id: string) {
    return async function (dispatch:Dispatch) {
        const info = localStorage.getItem('token') || '';
        const token = JSON.parse(info);
        const config = {
            headers: {
             "x-access-token": token.token,
           },
          };
        await api.get<Cheq[]>(`/cheq/detailCheq/${id}`,config)
        .then((dataAPI) => {
  
            dispatch<CheqDispatch>({type: actionsTypes.detailCheq, payload: dataAPI.data})
        })
    }
}

export function filterCheq (data:string) {
    // console.log("data: ",data)
    return async function (dispatch:Dispatch) {
        const info = localStorage.getItem('token') || '';
        const token = JSON.parse(info);
        const config = {
            headers: {
             "x-access-token": token.token,
           },
          };
        await api.get<Cheq[]>(`/cheq/cheq?filter=${data}`,config)
        .then((dataAPI) => {
            dispatch<CheqDispatch>({type: actionsTypes.filterCheq, payload: dataAPI.data})
        })
    }
}