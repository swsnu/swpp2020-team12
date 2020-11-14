import * as actionTypes from '../actions/actionTypes';

const initialState={
    status: null,
    gauge: null,
    subject: null,
}

const reducer =(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.INFER_STUDY:
            return { ...state, status: action.inferred.status, gauge: action.inferred.gauge}
        case actionTypes.START_STUDY:
            return { ...state, subject: action.subject}
        case actionTypes.END_STUDY:
            return { ...state, status: null, gauge: null}
        case actionTypes.CHANGE_SUBJECT:
            return { ...state, status: null, gauge: null, subject: action.subject}
        default:
            break;
    }
    return state;
}

export default reducer;