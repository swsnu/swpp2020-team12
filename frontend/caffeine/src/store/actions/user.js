import axios from 'axios'
import {history} from '../store';


export const signin = (data) => {
    return dispatch => {
        return axios.post('/user/signin', data)
            .then(res => {
                    history.push('/')
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

export const signout = () => {
    return dispatch => {
        return axios.get('/user/signout')
            .then((res) => {
                history.push('/signin')
            });
    }
}