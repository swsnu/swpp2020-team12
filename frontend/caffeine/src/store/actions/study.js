import * as actionTypes from './actionTypes'
import axios from 'axios'
import { push } from 'connected-react-router';

export const postCapturetoServer_ = (data) =>{
    return { type: actionTypes.INFER_STUDY, inferred: data};
}

export const postCapturetoServer = (image, id) =>{
    return dispatch =>{
        return axios.post('/study/infer/', {image: image, id: id})
            .then(res => dispatch(postCapturetoServer_(res.data)));
    } 
}
export const startStudy_ = (data) =>{
    return { type: actionTypes.START_STUDY, subject: data.subject, members: data.members};
}

export const startStudy = (subject, group_id) =>{
    return dispatch =>{
        return axios.post('/study/status/', {subject: subject, group_id: group_id})
            .then(res=>{
                dispatch(startStudy_(res.data));
                dispatch(push('/study/'+group_id));
            })
            .catch(err=> alert("study room is already full.\n maximum study members : 5"));
    } 
}
export const endStudy_ = () =>{
    return {type: actionTypes.END_STUDY}
}
export const endStudy = (group_id) =>{
    return dispatch =>{
        return axios.put('/study/status/',{group_id: group_id})
            .then(() => dispatch(endStudy_()));
    } 
}
export const changeSubject_ = (subject) =>{
    return {type: actionTypes.CHANGE_SUBJECT, subject: subject}
}
export const changeSubject = (subject, group_id) =>{
    return dispatch =>{
        return axios.put('/study/status/', {group_id: group_id})
            .then(() => {
                axios.post('/study/status/', {subject: subject, group_id: group_id})
                    .then(dispatch(changeSubject_(subject)));
            });
    } 
}