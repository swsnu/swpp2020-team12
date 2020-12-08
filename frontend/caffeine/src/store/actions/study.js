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
export const startStudy_ = (subject, members) =>{
    return { type: actionTypes.START_STUDY, subject: subject, members: members};
}

export const startStudy = (subject, group_id) =>{
    return dispatch =>{
        return axios.post('/study/status/', {subject: subject, group_id: group_id})
            .then(()=>{
                dispatch(res =>startStudy_(subject, res.data));
                dispatch(push('/study/'+group_id));
            });
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