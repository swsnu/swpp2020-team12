import reducer from './statistic';
import * as actionTypes from '../actions/actionTypes';

describe('studyReducer', () => {
    it('should get monthly data', () => {
        const stubInitialState={
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
        const newState = reducer(stubInitialState, {
            type: actionTypes.GET_MONTHLYDATA,
            monthlyData: [{'date':'2020-11-24',
            'count':0
            }]
        });
        expect(newState).toEqual({
            date: null,
            monthlyData: [
                {'date':'2020-11-24','count':0}
            ],
            weeklyData: null,
            weekly_total: null,
            weekly_study_time: null,
            dailyData: null,
            daily_total:null,
            daily_study_time:null
        });
    })
    it('should get weekly data', () => {
        const stubInitialState={
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
        const newState = reducer(stubInitialState, {
            type: actionTypes.GET_WEEKLYDATA,
            weeklyData: [{'x': 'swpp', 'y': 1.0}],
            weekly_total: '00:00',
            weekly_study_time: '00:00'
        });
        expect(newState).toEqual({
            date: null,
            monthlyData: [
                { date: '2020-11-01', count: 0 },
            ],
            weeklyData: [{'x': 'swpp', 'y': 1.0}],
            weekly_total: '00:00',
            weekly_study_time: '00:00',
            dailyData: null,
            daily_total:null,
            daily_study_time:null
        });
    })
    it('should get daily data', () => {
        const stubInitialState={
            date: null,
            monthlyData: [
                { date: '2020-11-01', count: 0 },
            ],
            weeklyData: null,
            weekly_total: null,
            weekly_study_time: null,
            dailyData: null,
            daily_total:null,
            daily_study_time:null,
        }
        const newState = reducer(stubInitialState, {
            type: actionTypes.GET_DAILYSUBJECT,  dailyData: [{'x': 'swpp', 'y': 1.0}],
            daily_total:'00:00',
            daily_study_time:'00:00'
            
        });
        expect(newState).toEqual({
            date: null,
            monthlyData: [
                { date: '2020-11-01', count: 0 },
            ],
            weeklyData: null,
            weekly_total: null,
            weekly_study_time: null,
            dailyData: [{'x': 'swpp', 'y': 1.0}],
            daily_total:'00:00',
            daily_study_time:'00:00'
        });
    })
})
