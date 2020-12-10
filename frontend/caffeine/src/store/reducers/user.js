import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    user: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LOGIN:
            return {...state, isLoggedIn: action.isLoggedIn, user: {'name': action.name, 'message': action.message}}
        case actionTypes.SIGN_OUT:
            return {...state, isLoggedIn: false}
        case actionTypes.SIGN_IN:
            return {...state, isLoggedIn: true, user:{name: action.name}}
        default:
            break;
    }
    return state;
}


export default reducer;