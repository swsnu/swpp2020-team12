import * as actionTypes from '../actions/actionTypes';

const initialState={
    groupRank: [],
    myGroupRank: null,
    userRank: [],
    myUserRank: null,
}

const reducer =(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.USER_DAY_RANK:
            return { ...state, userRank: action.rank, myUserRank: action.myRank }
        case actionTypes.USER_TOTAL_RANK:
            return { ...state, userRank: action.rank, myUserRank: action.myRank }
        case actionTypes.GROUP_DAY_RANK:
            return { ...state, groupRank: action.rank, myGroupRank: action.myRank }
        case actionTypes.GROUP_TOTAL_RANK:
            return { ...state, groupRank: action.rank, myGroupRank: action.myRank }
        default:
            break;
    }
    return state;
}

export default reducer;