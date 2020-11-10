import * as actionTypes from '../actions/actionTypes';

const initialState={
    username:"",
    password:"",
    name:"",
    message:"",
}

const reducer =(state=initialState, action)=>{
    switch (action.type){
        default:
            break;
    }
    return state;
}


export default reducer;