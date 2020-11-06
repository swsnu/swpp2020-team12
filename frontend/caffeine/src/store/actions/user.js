import * as actionTypes from './actionTypes'
import axios from 'axios'
import { Route, Switch, Redirect } from 'react-router-dom';

export const signin_ = (data) =>{
    return { 
        type: actionTypes.SIGN_IN,
        username: data.username,
        password: data.password
    };
}

export const signin = (data) =>{
    return dispatch =>{
        return axios.post('/user/signin', data)
            .then(res => dispatch(signin_(res.data)));
    }
}

export const signup_ = (data) =>{
    return { 
        type: actionTypes.SIGN_UP,
        username: data.username,
        password: data.password,
        name: data.name,
        message: data.message
    };
}

export const signup = (data) =>{
    return dispatch =>{
        return axios.post('/user/signup', data)
            .then(res => dispatch(signup_(res.data)));
    }
}