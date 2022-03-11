import {actionsTypes} from '../actions/types'

import {Event, EventDispatch} from '../../tools/interface';

export const eventReducer = (state : Event[] = [] , action: EventDispatch )=> {
    switch(action.type){
        case actionsTypes.getAllEvents:
            return action.payload
        case actionsTypes.createEvent:
            return action.payload
        case actionsTypes.deleteEvent:
            return action.payload
        
        default:
            return state
    }
    
}