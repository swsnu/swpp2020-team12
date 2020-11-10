import * as actionTypes from './actionTypes'
import axios from 'axios'
import { Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../store';




export const signin = (data) =>{
    return dispatch =>{
        return axios.post('/user/signin', data)
            .then(res => {
                if (res.status === 204){
                    history.push('/')
                }
            })
            .catch(err => {
                alert('Wrong id or password!!')
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