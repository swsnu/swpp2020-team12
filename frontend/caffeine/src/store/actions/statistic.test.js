/* eslint-disable no-unused-vars */
import axios from 'axios';
import * as actionCreators from './statistic';
import store from '../store';

describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    // Implementation using `spyOn` API
    it(`'getMonthlydata' should fetch monthly data correctly`, (done) => {
        const stubmonthlydata = [{'date':'2020-11-24','count':0}]
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(() => {
                return new Promise((resolve) => {
                    const result = {
                        status: 200,
                        data: stubmonthlydata
                    };
                    resolve(result);
                });
            })
        store.dispatch(actionCreators.getMonthlydata()).then(() => {
            const newState = store.getState();
            expect(newState.statistic.monthlyData).toBe(stubmonthlydata);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it(`'getWeeklydata' should fetch Weekly data correctly`, (done) => {
        const stubweeklydata = {weeklyData: [{'x': 'swpp', 'y': 1.0}], weekly_total: '00:00', weekly_study_time: '00:00'}
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(() => {
                return new Promise((resolve) => {
                    const result = {
                        status: 200,
                        data: stubweeklydata
                    };
                    resolve(result);
                });
            })
        store.dispatch(actionCreators.getWeeklydata()).then(() => {
            const newState = store.getState();
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it(`'getDailySubject' should fetch DailySubject data correctly`, (done) => {
        const stubdailydata = {dailyData: [{'x': 'swpp', 'y': 1.0}], daily_total: '00:00', daily_study_time: '00:00'}
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(() => {
                return new Promise((resolve) => {
                    const result = {
                        status: 200,
                        data: stubdailydata
                    };
                    resolve(result);
                });
            })
        store.dispatch(actionCreators.getDailySubject()).then(() => {
            //const newState = store.getState();
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
})