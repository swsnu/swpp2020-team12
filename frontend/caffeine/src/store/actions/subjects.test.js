import axios from 'axios';
import * as actionCreators from './subjects';
import store from '../store';

const stubSubject = {
    id: 1,
    name: 'test',
    description: '',
    user: 1,
    days: [{
        day: 1,
        start_time: '11:00',
        end_time: '13:00'
    }]
};

describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    // Implementation using `spyOn` API
    it(`'getSubjects' should fetch subjects correctly`, (done) => {
        const stubSubjectList = [stubSubject];

        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubSubjectList
                    };
                    resolve(result);
                });
            })
        store.dispatch(actionCreators.getSubjects()).then(() => {
            const newState = store.getState();
            expect(newState.subject.mySubjectList).toBe(stubSubjectList);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it(`'getSubject' should fetch subject correctly`, (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubSubject
                    };
                    resolve(result);
                });
            })

        store.dispatch(actionCreators.getSubject()).then(() => {
            const newState = store.getState();
            expect(newState.subject.specificSubjectInfo).toBe(stubSubject);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'addSubject' should post subject correctly`, (done) => {
        const stubNewSubject = {
            id: 1,
            name: 'new',
            description: '',
            user: 1,
            days: [{
                day: 2,
                start_time: '12:00',
                end_time: '14:00'
            }]
        };
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation((url, ar) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubNewSubject
                    };
                    resolve(result);
                });
            })

        store.dispatch(actionCreators.addSubject(stubNewSubject)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it(`'deleteSubject' should delete subject correctly`, (done) => {
        const spy = jest.spyOn(axios, 'delete')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: null,
                    };
                    resolve(result);
                });
            })

        store.dispatch(actionCreators.deleteSubject()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });


    it(`'editSubject' should edit Subject correctly`, (done) => {
        const stubEditSubject = {
            id: 1,
            name: 'new',
            description: '',
            user: 1,
            days: [{
                day: 2,
                start_time: '12:00',
                end_time: '14:00'
            }]
        };
        const spy = jest.spyOn(axios, 'put')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubEditSubject,
                    };
                    resolve(result);
                });
            })

        store.dispatch(actionCreators.editSubject(stubSubject)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
})