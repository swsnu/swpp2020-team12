import * as actionTypes from '../actions/actionTypes';

const initialState={
    myStudyInfo: null
}

const reducer =(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.GET_MY_STUDYINFO:
            return { ...state, myStudyInfo: action.studyinfo }
        default:
            break;
    }
    return state;
}

export default reducer;