import * as actionTypes from '../actions/actionTypes';

const initialState={
    username:"",
    password:"",
    name:"",
    message:"",
    isSignin: false
}

const reducer =(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.SIGN_IN:
            return { ...state, username:action.username, password:action.password, isSignin: true} 
        case actionTypes.SIGN_IN:
            return { ...state, username:action.username, password:action.password, name:action.name, message:action.message} 
        default:
            break;
    }
    return state;
}


export default reducer;