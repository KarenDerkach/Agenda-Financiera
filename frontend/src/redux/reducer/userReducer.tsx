import {actionsTypes} from '../actions/types'

import {UserDispatch, User} from '../../tools/interface';

export const userReducer = (state: User = {data:{name:'',email:'',password:'',_id:''} , error:'', isLogged:false, loading:false} , action: UserDispatch )=> {
    switch(action.type){
        case actionsTypes.userRegisterReq:
            return {loading: true};
        case actionsTypes.userRegister:
            return {data: action.payload, isLogged:true, loading:false};
        case actionsTypes.userRegisterFail:
            return {error: action.payload, isLogged:false };
        case actionsTypes.userLoginReq:
            return {loading: true}
        case actionsTypes.userLogin:
            return {isLogged: true,loading: false, data: action.payload}

        case actionsTypes.userLoginFail:
            return { isLogged:false,  error: action.payload}
        case actionsTypes.logoutUser:
            return {};
       
        default:
            return state
    }
    
}