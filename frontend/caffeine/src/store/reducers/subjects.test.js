import reducer from './subjects';
import * as actionTypes from '../actions/actionTypes';

const stubSubjects = [
    {id: 1, name: 'subject1', description: 'ds1', days: [{day: 0, start_time: '10:00', end_time: '12:00'}], user: 1},
    {id: 2, name: 'subject2', description: '', days: [{day: 0, start_time: '10:00', end_time: '12:00'}], user: 1}
]
const newSubject = {
    id: 3, name: 'subject3', description: 'ds3',
    days: [{day: 3, start_time: '13:00', end_time: '15:00'}], user: 1
}
const editSubject = {
    id: 2, name: 'subject2', description: 'ds_edit',
    days: [{day: 0, start_time: '10:00', end_time: '12:00'}], user: 1

}
describe('subject Reducer', () => {
    it('should return default state', () => {
        const newState = reducer(undefined, {}); // initialize
        expect(newState).toEqual({
            mySubjectList: [],
            specificSubjectInfo: null,
        });
    })
    it('should get all Subjects', () => {
        const newState = reducer(undefined, {
            type: actionTypes.GET_SUBJECTS,
            subjects: stubSubjects,
        });
        expect(newState).toEqual({
            mySubjectList: stubSubjects,
            specificSubjectInfo: null,
        });
    });
    it('should get Subject', () => {
        const newState = reducer(undefined, {
            type: actionTypes.GET_SUBJECT,
            targetSubject: stubSubjects[0],
        });
        expect(newState).toEqual({
            mySubjectList: [],
            specificSubjectInfo: stubSubjects[0],
        });
    });
    it('should add newSubject', () => {
        const newState = reducer(undefined, {
            type: actionTypes.ADD_SUBJECT,
            id: newSubject.id,
            name: newSubject.name,
            description: newSubject.description,
            days: newSubject.days,
            user: newSubject.user,
        });
        expect(newState).toEqual({
            mySubjectList: [newSubject],
            specificSubjectInfo: null,
        });
    });
    it('should delete Subjects', () => {
        const stubInitialState = {
            mySubjectList: stubSubjects,
        }
        const newState = reducer(stubInitialState, {
            type: actionTypes.DELETE_SUBJECT,
            targetID: 1
        })
        expect(newState).toEqual({
            mySubjectList: [stubSubjects[1]]
        })
    })
    it('should edit Subject', () => {
        const stubInitialState = {
            mySubjectList: stubSubjects,
            specificSubjectInfo: stubSubjects[1]
        }
        const newState = reducer(stubInitialState, {
            type: actionTypes.EDIT_SUBJECT,
            targetID: editSubject.id,
            name: editSubject.name,
            description: editSubject.description,
            days: editSubject.days,
            user: editSubject.user,
        });
        expect(newState).toEqual({
            mySubjectList: [stubSubjects[0], editSubject],
            specificSubjectInfo: editSubject,
        });
    });
})