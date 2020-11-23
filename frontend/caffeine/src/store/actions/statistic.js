import * as actionTypes from './actionTypes'
import axios from 'axios'


export const getMonthlydata_ = (response_list) => {
    return {type: actionTypes.GET_MONTHLYDATA, monthlyData: response_list};
}
export const getMonthlydata = (date) => {
    return dispatch => {
        return axios.get('/statistic/' + date.year() + '/' + date.month())
            .then(res => dispatch(getMonthlydata_(res.data)));
    }
}

export const getWeeklydata_ = (response) => {
    return {type: actionTypes.GET_WEEKLYDATA, weeklyData: response.weekly_subjectData, weekly_total:response.weekly_total, weekly_study_time:response.weekly_study_time};
}
export const getWeeklydata = (date) => {
    return dispatch => {
        return axios.get('/statistic/' + date.year() +'/'+ date.month() +'/'+ date.date())
            .then(res => dispatch(getWeeklydata_(res.data)));
    }
}

export const getDailySubject_ = (response) => {
    return {type: actionTypes.GET_DAILYSUBJECT, dailyData: response.subjectData, daily_total:response.daily_total, daily_study_time:response.daily_study_time};
}
export const getDailySubject = (date) => {
    return dispatch => {
        return axios.get('/statistic/' + date.year() +'/'+ date.month() +'/'+ date.date() + '/subjects')
            .then(res => dispatch(getDailySubject_(res.data)));
    }
}
