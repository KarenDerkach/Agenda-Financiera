import { actionsTypes } from '../redux/actions/types'

//interfaces de action CITY
export interface City{
    min: number,
    max: number,
    img: string,
    id: number,
    wind: number,
    temp: number,
    name: string,
    weather: string,
    clouds: number,
    latitud: number,
    longitud: number
}

export interface OwnCheq{
    cliente: string,
    banco: string,
    numero: number,
    status: string[],
    diferido: string,
    ingreso: string,
    importe: number,
    pago:string,
    observacion: string,
    _id:string
}

//DISPATCH

export interface CityDispatch{
    type: actionsTypes.searchCity,
    payload: City[]
}

export interface AllCityDispatch{
    type: actionsTypes.allCity,
    payload: City[]
}

export interface DeleteDispatch{
    type: actionsTypes.deleteCity,
    payload: City[]
}

export interface OwnCheqDispatch{
    type: actionsTypes.addOwnCheq | actionsTypes.getAllOwnCheq | actionsTypes.deleteOwnCheq | actionsTypes.updateOwnCheq
    payload: OwnCheq[]
}

//STORE
export interface StoreState {
	city: City[],
    allCities: City[],
    deleteCity: City[],
    stateOwnCheq: OwnCheq[]
}