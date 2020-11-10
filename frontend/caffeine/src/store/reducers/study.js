import * as actionTypes from '../actions/actionTypes';

const initialState={
    myStudyInfo: null,
    status: null,
    gauge: null
}

const reducer =(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.GET_MY_STUDYINFO:
            return { ...state, myStudyInfo: action.studyinfo }
        case actionTypes.INFER_STUDY:
            return { ...state, status: action.inferred.status, gauge: action.inferred.gauge}
        default:
            break;
    }
    return state;
}

export default reducer;