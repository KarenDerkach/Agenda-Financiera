import api from "../../../service/api"
import { Dispatch } from 'redux';
import { actionsTypes } from '../types'
import {AllCityDispatch, City, CityDispatch, DeleteDispatch} from '../../../tools/interface';




export function searchCity(city:string){
    return async function(dispatch:Dispatch){
         await api.get<City[]>(`/weather/${city}`)
        .then((dataAPI) : void =>{
            dispatch<CityDispatch>({type: actionsTypes.searchCity , payload: dataAPI.data})
        })
       
    }

}

export function allCity (){
    return async function(dispatch:Dispatch){
        await api.get<City[]>(`/weather`)
        .then((dataAPI) : void =>{
            dispatch<AllCityDispatch>({type: actionsTypes.allCity , payload: dataAPI.data})
        })
       
    }
}

export function deleteCity(id:number){
    return async function(dispatch:Dispatch){
        await api.delete(`/weather/${id}`)
        .then((dataAPI) : void =>{
            dispatch<DeleteDispatch>({type: actionsTypes.deleteCity , payload: dataAPI.data})
        })
       
    }
}