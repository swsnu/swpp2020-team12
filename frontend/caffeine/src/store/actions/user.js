/* eslint-disable no-unused-vars */
import * as actionTypes from './actionTypes'
import axios from 'axios'
import {history} from '../store';
import {push} from "connected-react-router";

export const getLogin_ = (user) => {
    return {type: actionTypes.GET_LOGIN, isLoggedIn: user.isLoggedIn, name:user.name, message: user.message};
};

export const getLogin = () => {
    return dispatch => {
        return axios.get('/user')
            .then(res => dispatch(getLogin_(res.data)))
    }
};

export const signin_ = () => {
    return {type: actionTypes.SIGN_IN, isLoggedIn: true}
}

export const signin = (data) => {
    return dispatch => {
        return axios.post('/user/signin', data)
            .then(res => {
                dispatch(signin_());
                dispatch(push('/'));
            })
            .catch(err => {
                alert('Wrong id or password!!')
            });
    }
}


export const signup = (data) => {
    return dispatch => {
        return axios.post('/user/signup', data)
            .then((res) => {
                history.push('/signin')
            })
            .catch(err => {
                alert('use another id')
            });
    }
}

export const signout_ = () => {
    return {type: actionTypes.SIGN_OUT, isLoggedIn: false}
}

export const signout = () => {
    return dispatch => {
        return axios.get('/user/signout')
            .then((res) => {
                dispatch(signout_());
                dispatch(push('/'));
            });
    }
}