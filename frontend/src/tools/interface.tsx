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

export interface StoreState {
	city: City[],
    allCities: City[],
    deleteCity: City[]
}