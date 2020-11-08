import * as actionTypes from './actionTypes'
import axios from 'axios'

export const getSubjects_ = (subjects) => {
    return {type: actionTypes.GET_SUBJECTS, subjects: subjects};
}
export const getSubjects = () => {
    return dispatch => {
        return axios.get('/subject')
            .then(res => dispatch(getSubjects_(res.data)));
    }
}

export const getSubject_ = (subject) => {
    return {type: actionTypes.GET_SUBJECT, targetSubject: subject};
}
export const getSubject = (subject_id) => {
    return dispatch => {
        return axios.get('/subject/' + subject_id)
            .then(res => dispatch(getSubject_(res.data)));
    }
}

export const deleteSubject_ = (subject_id) => {
    return {type: actionTypes.DELETE_SUBJECT, targetID: subject_id};
}
export const deleteSubject = (subject_id) => {
    return dispatch => {
        return axios.delete('/subject/' + subject_id)
            .then(() => dispatch(deleteSubject_(subject_id)));
    }
}

export const addSubject_ = (subject) => {
    return {
        type: actionTypes.ADD_SUBJECT,
        id: subject.id,
        name: subject.name,
        description: subject.description,
        days: moment.duration.day(subject.days.days),
        time: moment.duration.hours(subject.start_time_hour).minutes(subject.start_time_min),
        duration: moment.duration.hours(subject.duration_hour),
        user: subject.user
    };
}
export const addSubject = (data) => {
    return dispatch => {
        return axios.post('/subject', data)
            .then(res => dispatch(addSubject_(res.data)));
    }
}

export const editSubject_ = (subject) => {
    return {
        type: actionTypes.EDIT_SUBJECT,
        id: subject.id,
        name: subject.name,
        description: subject.description,
        days: [moment.duration.day(subject.day),
            moment.duration.hours(subject.start_time_hour).minutes(subject.start_time_min),
            moment.duration.hours(subject.duration_hour)],
        user: subject.user
    };
}
export const editSubject = (data) => {
    return dispatch => {
        return axios.post('/subject/' + data.id, data)
            .then(res => dispatch(editSubject_(res.data)));
    }
}