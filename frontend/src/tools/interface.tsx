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

export interface Cheq{
    cliente: string,
    banco: string,
    numero: number,
    status: string[],
    type: string[],
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

export interface CheqDispatch{
    type: actionsTypes.addCheq | actionsTypes.getAllCheq | actionsTypes.deleteCheq | actionsTypes.updateCheq |actionsTypes.detailCheq |actionsTypes.filterCheq
    payload: Cheq[]
}

//STORE
export interface StoreState {
	city: City[],
    allCities: City[],
    deleteCity: City[],
    stateCheq: Cheq[]
}