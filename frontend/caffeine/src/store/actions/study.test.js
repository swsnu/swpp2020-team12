/* eslint-disable no-unused-vars */
import axios from 'axios';
import * as actionCreators from './study';
import store from '../store';


describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    it(`'postCapture' should postcapture correctly`, (done) => {
        const image = []
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation((url, ar) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: []
                    };
                    resolve(result);
                });
            })
        store.dispatch(actionCreators.postCapturetoServer({image: image})).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'startStudy' should start study`, (done) => {
        const spy = jest.spyOn(axios, 'post')
        .mockImplementation((url, ar) => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                };
                resolve(result);
            });
        })
    store.dispatch(actionCreators.startStudy({subject: "swpp", group_id: 1}))
        .then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    })

    it(`'endStudy' should end study`, (done) => {
        const spy = jest.spyOn(axios, 'put')
        .mockImplementation((url, ar) => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                };
                resolve(result);
            });
        })
    store.dispatch(actionCreators.endStudy())
        .then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
    });
    })

    it(`'changeStudy' should change study`, (done) => {
        const spy = jest.spyOn(axios, 'put')
        .mockImplementation((url, ar) => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                };
                resolve(result);
            });
        })
        const spy2 = jest.spyOn(axios, 'post')
        .mockImplementation((url, ar) => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                };
                resolve(result);
            });
        })
        store.dispatch(actionCreators.changeSubject({subject: "swpp", group_id: 1}))
            .then(() => {
                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy2).toHaveBeenCalledTimes(1);
                done();
        });
    })



})