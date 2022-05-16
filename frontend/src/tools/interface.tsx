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
    longitud: number,
    cod: string
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

export interface Event{
    title: string,
    start: Date,
    end: Date,
    notes: string,
    type: string[],
    _id:string

}

export interface User{
    data:{name: string,
    email: string,
    password: string,
    _id:string
    }
    error: string,
    loading:boolean,
    isLogged:boolean
}

//DISPATCH

export interface CityDispatch{
    type: actionsTypes.searchCity | actionsTypes.allCity | actionsTypes.deleteCity | actionsTypes.detailCity,
    payload: City[]
}


export interface CheqDispatch{
    type: actionsTypes.addCheq | actionsTypes.getAllCheq | actionsTypes.deleteCheq | actionsTypes.updateCheq |actionsTypes.detailCheq |actionsTypes.filterCheq
    payload: Cheq[]
}

export interface EventDispatch{
    type: actionsTypes.createEvent | actionsTypes.deleteEvent | actionsTypes.getAllEvents
    payload: Event[]
}

export interface UserDispatch{
    type: actionsTypes.userLoginReq |actionsTypes.userLogin |  actionsTypes.userLoginFail | actionsTypes.logoutUser | actionsTypes.userRegisterReq | actionsTypes.userRegister | actionsTypes.userRegisterFail
    payload: Object
}

//STORE
export interface StoreState {
	city: City[],
    stateCheq: Cheq[]
    stateEvent: Event[]
    stateUser: any
}