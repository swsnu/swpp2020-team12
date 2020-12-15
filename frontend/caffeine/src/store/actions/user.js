/* eslint-disable no-unused-vars */
import * as actionTypes from './actionTypes'
import axios from 'axios'
import {history} from '../store';
import {push} from "connected-react-router";
/*
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');
*/

export const getLogin_ = (user) => {
    return {type: actionTypes.GET_LOGIN, isLoggedIn: user.isLoggedIn, name: user.name, message: user.message};
};

export const getLogin = () => {
    return dispatch => {
        return axios.get('/api/user')
            .then(res => dispatch(getLogin_(res.data)))
    }
};

export const signin_ = (data) => {
    return {type: actionTypes.SIGN_IN, isLoggedIn: true, name: data.user}
}

export const signin = (data) => {
    return dispatch => {
        return axios.post('/api/user/signin', data)
            .then(res => {
                dispatch(signin_(res.data));
                dispatch(push('/'));
            })
            .catch(err => {
                alert('Wrong id or password!!')
            });
    }
}


export const signup = (data) => {
    return dispatch => {
        return axios.post('/api/user/signup', data)
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
        return axios.get('/api/user/signout')
            .then((res) => {
                dispatch(signout_());
                dispatch(push('/'));
            });
    }
}