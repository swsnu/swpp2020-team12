import * as actionTypes from './actionTypes'
import axios from 'axios'


export const getGroupDayRank_ = (records) => {
    return {
        type: actionTypes.GROUP_DAY_RANK, rank: records.records,
        myRank: {'rank': records.user_ranking, 'record': records.user_record}
    };
}

export const getGroupDayRank = (group_id) => {
    return dispatch => {
        return axios.get('/rank/group/' + group_id)
            .then(res => dispatch(getGroupDayRank_(res.data)));
    }
}

export const getGroupTotalRank_ = (records) => {
    return {
        type: actionTypes.GROUP_DAY_RANK, rank: records.records,
        myRank: {'rank': records.user_ranking, 'record': records.user_record}
    };
}

export const getGroupTotalRank = (group_id) => {
    return dispatch => {
        return axios.post('/rank/group/' + group_id)
            .then(res => dispatch(getGroupTotalRank_(res.data)));
    }
}

export const getUserDayRank_ = (records) => {
    return {
        type: actionTypes.USER_DAY_RANK, rank: records.records,
        myRank: {'rank': records.user_ranking, 'record': records.user_record}
    };
}

export const getUserDayRank = () => {
    return dispatch => {
        return axios.get('/rank/user')
            .then(res => dispatch(getUserDayRank_(res.data)));
    }
}

export const getUserTotalRank_ = () => {
    return {
        type: actionTypes.USER_TOTAL_RANK, rank: records.records,
        myRank: {'rank': records.user_ranking, 'record': records.user_record}
    };
}

export const getUserTotalRank = () => {
    return dispatch => {
        return axios.post('/rank/user')
            .then(res => dispatch(getUserTotalRank_(res.data)));
    }
}

