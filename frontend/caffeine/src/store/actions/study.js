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
        return axios.post('/study/infer/', image)
            .then(res => dispatch(postCapturetoServer_(res.data)));
    } 
}
export const startStudy = (subject, group_id) =>{
    return dispatch =>{
        return axios.post('/study/stats/', {subject: subject, group_id: group_id})
            .then(()=>{
                dispatch(push('/study/'+group_id));
            });
    } 
}