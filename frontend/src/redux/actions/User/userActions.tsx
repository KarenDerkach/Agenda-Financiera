import api from '../../../service/api';
import { Dispatch } from 'redux';
import { UserDispatch } from "../../../tools/interface";
import { actionsTypes } from '../types';


export function registerUser (input:Object) {
  return async function (dispatch:Dispatch) {
  try {
    dispatch({ type: actionsTypes.userLoginReq });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await api.post(
      "/auth/register",
      input,
      config
    );

    dispatch({ type: actionsTypes.userRegister, payload: data });

    dispatch({ type: actionsTypes.userLogin, payload: data });

    localStorage.setItem("token", JSON.stringify(data));
  } catch (error:any) {
    console.log("el errror", error);
    dispatch({
      type: actionsTypes.userRegisterFail,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
    
    
  }
}
};
  

export function loginUser (input:Object) {
  return async function (dispatch:Dispatch) {
    
      dispatch({ type: actionsTypes.userLoginReq });

      const config = {
                   headers: {
                    "Content-type": "application/json",
                  },
                 };
      const { data } = await api.post("/auth/login", input, config)

      if(data.ok){
         
      dispatch<UserDispatch>({ type: actionsTypes.userLogin, payload: data } )

      localStorage.setItem("token",JSON.stringify(data) )
      }
      else{
        dispatch({ type: actionsTypes.userLoginFail, payload: data.message })
      }
  
    }
  
    

}


export const logout = () => async (dispatch:Dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: actionsTypes.logoutUser });
  };