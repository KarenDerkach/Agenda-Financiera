import {actionsTypes} from '../actions/types'

import {City, CityDispatch} from '../../tools/interface';



export const  cityReducer = (state : City[] = [] , action: CityDispatch )=> {
    switch(action.type){
        case actionsTypes.searchCity:
            return action.payload
        case actionsTypes.allCity:
            return action.payload
        case actionsTypes.deleteCity:
            return action.payload
        case actionsTypes.detailCity:
            return action.payload
        default:
             return state
    }
    
}

