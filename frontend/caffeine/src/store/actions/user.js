import * as actionTypes from './actionTypes'
import axios from 'axios'
import { Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../../../src/store/store.js';



export const signin = (data) =>{
    return dispatch =>{
        return axios.post('/user/signin', data)
            .then(res => {
                if (res.status === 204){
                    history.push('/')
                }
            });
    }
}



export const signup = (data) =>{
    return dispatch =>{
        return axios.post('/user/signup', data)
            .then((res) => {
                if (res.status === 201){
                    history.push('/signin')
                }
            });
    }
}