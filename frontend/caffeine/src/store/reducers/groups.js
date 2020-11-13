import * as actionTypes from '../actions/actionTypes';

const initialState={
    myGroupList: [],
    searchGroupList: [],
    specificGroupInfo: null,
    unenrolledGroupInfo: null
}

const reducer =(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.GET_GROUPS:
            return { ...state, myGroupList: action.groups }
        case actionTypes.GET_GROUP:
            return { ...state, specificGroupInfo: action.targetGroup }
        case actionTypes.SEARCH_GROUP:
            return { ...state, searchGroupList: action.searchedGroups }
        case actionTypes.ADD_GROUP:
            const new_group={
                id: action.id,
                name: action.name,
                time: action.time,
                description: action.description,
                members: action.members
            }
            return{ ...state, myGroupList: [...state.myGroupList, new_group] }
        case actionTypes.DELETE_GROUP:
            const deleted_groups = state.myGroupList.filter((group) => {
                return group.id!==action.targetID;
            });
            return { ...state, myGroupList: deleted_groups}
        case actionTypes.GET_UNENROLLED:
            return {...state, unenrolledGroupInfo: action.unenrolled}
        case actionTypes.JOIN_GROUP:
            const join_group={
                id: action.id,
                name: action.name,
                time: action.time,
                description: action.description,
                members: action.members
            }
            return {...state, unenrolledGroupInfo: null, myGroupList:[...state.myGroupList, join_group]}
        default:
            break;
    }
    return state;
}

export default reducer;