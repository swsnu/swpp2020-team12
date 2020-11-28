/* eslint-disable no-unused-vars */
import axios from 'axios';
import * as actionCreators from './ranking';
import store from '../store';

const stubRank= {
    records: [
        {'name': 'nickname2', 'time': 'P0DT01H42M00S'},
        {'name': 'nickname1', 'time': 'P0DT01H30M00S'},
        {'name': 'nickname3', 'time': 'P0DT01H00M00S'},
        {'name': 'nickname4', 'time': 'P0DT00H00M00S'}
    ],
    user_ranking: 2,
    user_record: {'name': 'nickname1', 'time': 'P0DT01H30M00S'}
}



describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    // Implementation using `spyOn` API
    it(`'getGroupDayRank' should fetch rank correctly`, (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubRank
                    };
                    resolve(result);
                });
            });
        store.dispatch(actionCreators.getGroupDayRank()).then(() => {
            const newState = store.getState();
            expect(newState.rank.groupRank).toBe(stubRank.records);
            expect(newState.rank.myGroupRank).toStrictEqual({
                'rank': stubRank.user_ranking,
                'record' : stubRank.user_record
            });
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it(`'getGroupTotalRank' should fetch rank correctly`, (done) => {
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubRank
                    };
                    resolve(result);
                });
            });
        store.dispatch(actionCreators.getGroupTotalRank()).then(() => {
            const newState = store.getState();
            expect(newState.rank.groupRank).toBe(stubRank.records);
            expect(newState.rank.myGroupRank).toStrictEqual({
                'rank': stubRank.user_ranking,
                'record' : stubRank.user_record
            });
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it(`'getUserDayRank' should fetch rank correctly`, (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubRank
                    };
                    resolve(result);
                });
            });
        store.dispatch(actionCreators.getUserDayRank()).then(() => {
            const newState = store.getState();
            expect(newState.rank.userRank).toBe(stubRank.records);
            expect(newState.rank.myUserRank).toStrictEqual({
                'rank': stubRank.user_ranking,
                'record' : stubRank.user_record
            });
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it(`'getUserTotalRank' should fetch rank correctly`, (done) => {
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubRank
                    };
                    resolve(result);
                });
            });
        store.dispatch(actionCreators.getUserTotalRank()).then(() => {
            const newState = store.getState();
            expect(newState.rank.userRank).toBe(stubRank.records);
            expect(newState.rank.myUserRank).toStrictEqual({
                'rank': stubRank.user_ranking,
                'record' : stubRank.user_record
            });
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

})