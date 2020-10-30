import * as actionTypes from './actionTypes'
import axios from 'axios'



export const SearchGroups_ = (groups) =>{
    return { type: actionTypes.SEARCH_GROUP, searchedGroups: groups };
}
export const SearchGroups = (keyword) =>{
    return dispatch =>{
        return axios.get('/group/search/'+keyword)
            .then(res => dispatch(SearchGroups_(res.data)));
    }
}
export const getGroups_ = (groups) =>{
    return { type: actionTypes.GET_GROUPS, groups: groups };
}
export const getGroups = () =>{
    return dispatch =>{
        return axios.get('/group')
            .then(res => dispatch(SearchGroups_(res.data)));
    }
}
export const getGroup_ = (group) =>{
    return { type: actionTypes.GET_GROUP, targetGroup: group };
}
export const getGroup = (group_id) =>{
    return dispatch =>{
        return axios.get('/group/'+group_id)
            .then(res => dispatch(SearchGroups_(res.data)));
    }
}
export const deleteGroup_ = (group_id) =>{
    return { type: actionTypes.DELETE_GROUP, targetID: group_id };
}
export const deleteGroup = (group_id) =>{
    return dispatch =>{
        return axios.delete('/group/user/'+group_id)
            .then(() => dispatch(SearchGroups_(group_id)));
    }
}
export const addGroup_ = (group) =>{
    return { 
        type: actionTypes.ADD_GROUP,
        id: group.id,
        name: group.name,
        description: group.description,
        time: group.time,
        members: 1,
    };
}
export const addGroup= (data) =>{
    return dispatch =>{
        return axios.post('/group', data)
            .then(res => dispatch(addGroup_(res.data)));
    }
}
