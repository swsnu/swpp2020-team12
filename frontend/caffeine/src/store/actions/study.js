import * as actionTypes from './actionTypes'
import axios from 'axios'
import { push } from 'connected-react-router';

export const getmyStudyInfo=()=>{
    return dispatch =>{
        return axios.get('/study/stats/')
            .then(res => dispatch(getmyStudyInfo_(res.data)));
    }
}

export const getmyStudyInfo_ = (studyinfo) =>{
    return { type: actionTypes.GET_MY_STUDYINFO, studyinfo: studyinfo };
}

export const postCapturetoServer_ = (data) =>{
    return { type: actionTypes.INFER_STUDY, inferred: data};
}

export const postCapturetoServer = (image) =>{
    return dispatch =>{
        return axios.post('/study/infer/', {image: image})
            .then(res => dispatch(postCapturetoServer_(res.data)));
    } 
}
export const startStudy_ = (subject) =>{
    return { type: actionTypes.START_STUDY, subject: subject};
}

export const startStudy = (subject, group_id) =>{
    return dispatch =>{
        return axios.post('/study/status/', {subject: subject, group_id: group_id})
            .then(()=>{
                dispatch(startStudy_(subject));
                dispatch(push('/study/'+group_id));
            });
    } 
}
export const endStudy_ = () =>{
    return {type: actionTypes.END_STUDY}
}
export const endStudy = () =>{
    return dispatch =>{
        return axios.put('/study/status/')
            .then(res => dispatch(endStudy_()));
    } 
}
export const changeSubject_ = (subject) =>{
    return {type: actionTypes.CHANGE_SUBJECT, subject: subject}
}
export const changeSubject = (subject, group_id) =>{
    return dispatch =>{
        return axios.put('/study/status/')
            .then(() => {
                axios.post('/study/status/', {subject: subject, group_id: group_id})
                    .then(dispatch(changeSubject_(subject)));
            });
    } 
}