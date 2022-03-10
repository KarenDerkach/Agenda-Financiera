import {actionsTypes} from '../actions/types'

import {Cheq, CheqDispatch} from '../../tools/interface';

export const addCheqReducer = (state : Cheq[] = [] , action: CheqDispatch )=> {
    switch(action.type){
        case actionsTypes.addCheq:
            return action.payload
        case actionsTypes.getAllCheq:
            return action.payload
        case actionsTypes.deleteCheq:
            return action.payload
        case actionsTypes.updateCheq:
            return action.payload
        case actionsTypes.detailCheq:
            return action.payload
        case actionsTypes.filterCheq:
            return action.payload
        default:
            return state
    }
    
}