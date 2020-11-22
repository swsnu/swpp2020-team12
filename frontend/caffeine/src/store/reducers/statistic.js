import * as actionTypes from '../actions/actionTypes';

const initialState={
    date: null,
    monthlyData: [
        { date: '2020-11-01', count: 0 },
    ],
    weeklyData: null,
    weekly_total: null,
    weekly_study_time: null,
    dailyData: null,
    daily_total:null,
    daily_study_time:null
}

const reducer =(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.GET_MONTHLYDATA:
            return { ...state, monthlyData: action.monthlyData }
        case actionTypes.GET_WEEKLYDATA:
            return { ...state, weeklyData: action.weeklyData, weekly_total:action.weekly_total, weekly_study_time:action.weekly_study_time }
        case actionTypes.GET_DAILYSUBJECT:
            return { ...state, dailyData: action.dailyData, daily_total:action.daily_total, daily_study_time:action.daily_study_time }
        default:
            break;
    }
    return state;
}

export default reducer;