import * as actionTypes from './actionTypes'
import axios from 'axios'
import moment from 'moment'

export const getMonthlydata_ = (response_list) => {
    return {type: actionTypes.GET_MONTHLYDATA, monthlyData: response_list};
}
export const getMonthlydata = (date) => {
    return dispatch => {
        var year=moment(date).year()
        var month=moment(date).month()
        return axios.get('/statistic/' + year + '/' + month)
            .then(res => dispatch(getMonthlydata_(res.data)));
    }
}

export const getWeeklydata_ = (response) => {
    return {type: actionTypes.GET_WEEKLYDATA, weeklyData: response.weekly_subjectData, weekly_total:response.weekly_total, weekly_study_time:response.weekly_study_time};
}
export const getWeeklydata = (date) => {
    return dispatch => {
        var year=moment(date).year()
        var month=moment(date).month()
        var day=moment(date).date()
        return axios.get('/statistic/' + year +'/'+ month +'/'+ day)
            .then(res => dispatch(getWeeklydata_(res.data)));
    }
}

export const getDailySubject_ = (response) => {
    return {type: actionTypes.GET_DAILYSUBJECT, dailyData: response.subjectData, daily_total:response.daily_total, daily_study_time:response.daily_study_time, timelineData: response.timelineData};
}
export const getDailySubject = (date) => {
    return dispatch => {
        var year=moment(date).year()
        var month=moment(date).month()
        var day=moment(date).date()
        return axios.get('/statistic/' + year +'/'+ month +'/'+ day + '/subjects')
            .then(res => dispatch(getDailySubject_(res.data)));
    }
}
