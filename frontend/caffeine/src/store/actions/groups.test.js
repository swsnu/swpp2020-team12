/* eslint-disable no-unused-vars */
import axios from 'axios';
import * as actionCreators from './groups';
import store from '../store';

const stubGroup={
    id: 1,
    name: 'test',
    description: null,
    time: 'P0DT10H42M00S',
};

describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    
    // Implementation using `spyOn` API
    it(`'getGroups' should fetch groups correctly`, (done) => {
        const stubgroupList = [stubGroup];
  
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubgroupList
                    };
                    resolve(result);
                });
            })
        store.dispatch(actionCreators.getGroups()).then(() => {
            const newState = store.getState();
            expect(newState.group.myGroupList).toBe(stubgroupList);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it(`'getGroup' should fetch group correctly`, (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: stubGroup
                };
                resolve(result);
                });
            })
    
        store.dispatch(actionCreators.getGroup()).then(() => {
            const newState = store.getState();
            expect(newState.group.specificGroupInfo).toBe(stubGroup);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it(`'SearchGroups' should fetch groups correctly`, (done) => {
        const stubgroupList = [stubGroup];
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: stubgroupList
                };
                resolve(result);
                });
            })
    
        store.dispatch(actionCreators.SearchGroups()).then(() => {
            const newState = store.getState();
            expect(newState.group.searchGroupList).toBe(stubgroupList);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it(`'addGroup' should post group correctly`, (done) => {
        const stubnewgroup={
            author_id: 1,
            title: 'test',
            content: 'testcontent',
        };
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation((url, ar) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubnewgroup
                    };
                    resolve(result);
                });
            })
    
        store.dispatch(actionCreators.addGroup(stubnewgroup)).then(() => {
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
    });
    it(`'deleteGroup' should delete group correctly`, (done) => {
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
    
        store.dispatch(actionCreators.deleteGroup()).then(() => {
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
    });

    it(`'joinGroup' should join group correctly`, (done) => {
        const spy = jest.spyOn(axios, 'put')
            .mockImplementation((url, ar)=> {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: {
                            name: "text",
                            time: 'P0DT10H42M00S',
                            description: "hi",
                            members: [1,2,3]
                        },
                    };
                    resolve(result);
                });
        })
        store.dispatch(actionCreators.joinGroup({
                            name: "text",
                            time: 'P0DT10H42M00S',
                            description: "hi",
                            members: [1,2,3]
                        })).then(() => {
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
    });

    it(`'getunEnrolled' should join group correctly`, (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation((url, ar)=> {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: [1,2,3,4]
                    };
                    resolve(result);
                });
        })
        store.dispatch(actionCreators.getunEnrolled(1)).then(() => {
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
    });
})