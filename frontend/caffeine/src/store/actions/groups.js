/* eslint-disable no-unused-vars */
import * as actionTypes from './actionTypes'
import axios from 'axios'
import {push} from 'connected-react-router'

export const SearchGroups_ = (groups) => {
    return {type: actionTypes.SEARCH_GROUP, searchedGroups: groups};
}
export const SearchGroups = (keyword) => {
    return dispatch => {
        return axios.post('/api/group/search/' + keyword)
            .then(res => dispatch(SearchGroups_(res.data)));
    }
}
export const getGroups_ = (groups) => {
    return {type: actionTypes.GET_GROUPS, groups: groups};
}
export const getGroups = () => {
    return dispatch => {
        return axios.get('/api/group/')
            .then(res => dispatch(getGroups_(res.data)));
    }
}
export const getunEnrolled = (group_id) => {
    return dispatch => {
        return axios.get('/api/group/search/' + group_id)
            .then(res => dispatch(getunEnrolled_(res.data)))
            .catch(()=> {
                alert("you already joined this group");
                dispatch(push('/group'));
            });
    }
}
export const getunEnrolled_ = (groups) => {
    return {type: actionTypes.GET_UNENROLLED, unenrolled: groups};
}
export const getGroup_ = (group) => {
    return {type: actionTypes.GET_GROUP, targetGroup: group};
}
export const getGroup = (group_id) => {
    return dispatch => {
        return axios.get('/api/group/' + group_id)
            .then(res => dispatch(getGroup_(res.data)))
    }
}
export const deleteGroup_ = (group_id) => {
    return {type: actionTypes.DELETE_GROUP, targetID: group_id};
}
export const deleteGroup = (group_id) => {
    return dispatch => {
        return axios.delete('/api/group/' + group_id)
            .then(() => dispatch(deleteGroup_(group_id)));
    }
}
export const joinGroup_ = (group) => {
    return {
        type: actionTypes.JOIN_GROUP, id: group.id,
        name: group.name, time: group.time,
        description: group.description, members: group.members,
        active_count: group.active_count
    };
}
export const joinGroup = (data) => {
    return dispatch => {
        return axios.put('/api/group/search/' + data.id, data)
            .then(res => {
                dispatch(joinGroup_(res.data));
                dispatch(push('/group'));
            })
            .catch(err => {
                alert("password is wrong")
            })
        }
    }

export const addGroup_ = (group) => {
    return {
        type: actionTypes.ADD_GROUP,
        id: group.id,
        name: group.name,
        description: group.description,
        time: group.time,
        members: group.members,
        active_count: group.active_count
    };
}
export const addGroup = (data) => {
    return dispatch => {
        return axios.post('/api/group/', data)
            .then(res => dispatch(addGroup_(res.data)))
            .catch(err => {
                alert('use another group name')
            });
    }
}
