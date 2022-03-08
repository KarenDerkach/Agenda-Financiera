import {actionsTypes} from '../actions/types'

import {OwnCheq, OwnCheqDispatch} from '../../tools/interface';

export const addCheqReducer = (state : OwnCheq[] = [] , action: OwnCheqDispatch )=> {
    switch(action.type){
        case actionsTypes.addOwnCheq:
            return action.payload
        case actionsTypes.getAllOwnCheq:
            return action.payload
        case actionsTypes.deleteOwnCheq:
            return action.payload
        case actionsTypes.updateOwnCheq:
            return action.payload
        default:
            return state
    }
    
}