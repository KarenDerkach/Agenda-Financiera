import api from "../../../service/api"
import { Dispatch } from 'redux';
import { actionsTypes } from '../types'
import {City, CityDispatch} from '../../../tools/interface';
import swal from "sweetalert";




export function searchCity(city:string){
    return async function(dispatch:Dispatch){
         await api.get<City[]>(`/weather/${city}`)
        .then((dataAPI) : void =>{
            dispatch<CityDispatch>({type: actionsTypes.searchCity , payload: dataAPI.data})
        })
        .catch((err) =>{
            swal("UPS!", "No se encontro la ciudad", "warning");
        })
       
    }

}

export function allCity (){
    return async function(dispatch:Dispatch){
        await api.get<City[]>(`/weather`)
        .then((dataAPI) : void =>{
            dispatch<CityDispatch>({type: actionsTypes.allCity , payload: dataAPI.data})
        })
       
    }
}

export function deleteCity(id:number){
    return async function(dispatch:Dispatch){
        await api.delete(`/weather/${id}`)
        .then((dataAPI) : void =>{
            dispatch<CityDispatch>({type: actionsTypes.deleteCity , payload: dataAPI.data})
        })
       
    }
}

export function detailCity(latitud: string, longitud: string){
    return async function(dispatch:Dispatch){
        await api.get(`/weather/detail/${latitud}/${longitud}`)
        .then((dataAPI) : void =>{
            dispatch<CityDispatch>({type: actionsTypes.detailCity , payload: dataAPI.data})
        })
       
    }
}