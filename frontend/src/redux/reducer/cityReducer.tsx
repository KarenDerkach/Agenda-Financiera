import {actionsTypes} from '../actions/types'

import {City, CityDispatch, AllCityDispatch, DeleteDispatch} from '../../tools/interface';



export const  cityReducer = (state : City[] = [] , action: CityDispatch )=> {
    switch(action.type){
        case actionsTypes.searchCity:
            return action.payload
        default:
             return state
    }
    
}

export const  allCityReducer = (state : City[] = [] , action: AllCityDispatch )=> {
    switch(action.type){
        case actionsTypes.allCity:
            return action.payload
        default:
            return state
    }
    
}


export const deleteReducer = (state : City[] = [] , action: DeleteDispatch )=> {
    switch(action.type){
        case actionsTypes.deleteCity:
            return action.payload
        default:
            return state
    }
    
}