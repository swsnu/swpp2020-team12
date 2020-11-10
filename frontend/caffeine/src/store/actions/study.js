import * as actionTypes from './actionTypes'
import axios from 'axios'

export const getmyStudyInfo=()=>{
    return dispatch =>{
        return axios.get('/study/stats')
            .then(res => dispatch(getmyStudyInfo_(res.data)));
    }
}

export const getmyStudyInfo_ = (studyinfo) =>{
    return { type: actionTypes.GET_MY_STUDYINFO, studyinfo: studyinfo };
}