import reducer from './ranking';
import * as actionTypes from '../actions/actionTypes';
/*
{"records": [{'name': 'nickname2', 'time': 'P0DT01H42M00S'},
                                                       {'name': 'nickname1', 'time': 'P0DT01H30M00S'},
                                                       {'name': 'nickname3', 'time': 'P0DT01H00M00S'},
                                                       {'name': 'nickname4', 'time': 'P0DT00H00M00S'}
                                                       ],
                                           "user_ranking": 2,
                                           "user_record": {'name': 'nickname1', 'time': 'P0DT01H30M00S'}}
 */

const stubRank = [
    {'name': 'nickname2', 'time': 'P0DT01H42M00S'},
    {'name': 'nickname1', 'time': 'P0DT01H30M00S'},
    {'name': 'nickname3', 'time': 'P0DT01H00M00S'},
    {'name': 'nickname4', 'time': 'P0DT00H00M00S'}
]
const stubMyRank={'rank':2, 'record':{'name': 'nickname1', 'time': 'P0DT01H30M00S'}};

describe('rank Reducer', () => {
    it('should return default state', () => {
        const newState = reducer(undefined, {}); // initialize
        expect(newState).toEqual({
            groupRank: [],
            myGroupRank: null,
            userRank: [],
            myUserRank: null,
        });
    })
    it('should get user day rank', () => {
        const newState = reducer(undefined, {
            type: actionTypes.USER_DAY_RANK,
            rank: stubRank,
            myRank: stubMyRank
        });
        expect(newState).toEqual({
            groupRank: [],
            myGroupRank: null,
            userRank: stubRank,
            myUserRank: stubMyRank,
        });
    });
    it('should get user total rank', () => {
        const newState = reducer(undefined, {
            type: actionTypes.USER_TOTAL_RANK,
            rank: stubRank,
            myRank: stubMyRank
        });
        expect(newState).toEqual({
            groupRank: [],
            myGroupRank: null,
            userRank: stubRank,
            myUserRank: stubMyRank,
        });
    });
    it('should get group day rank', () => {
        const newState = reducer(undefined, {
            type: actionTypes.GROUP_DAY_RANK,
            rank: stubRank,
            myRank: stubMyRank
        });
        expect(newState).toEqual({
            groupRank: stubRank,
            myGroupRank: stubMyRank,
            userRank: [],
            myUserRank: null,
        });
    });
    it('should search Group', () => {
        const newState = reducer(undefined, {
            type: actionTypes.GROUP_TOTAL_RANK,
            rank: stubRank,
            myRank: stubMyRank
        });
        expect(newState).toEqual({
            groupRank: stubRank,
            myGroupRank: stubMyRank,
            userRank: [],
            myUserRank: null,
        });
    });

});