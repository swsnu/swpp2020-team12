/* eslint-disable no-unused-vars */
import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import * as actionCreators from './store/actions/user';
import App from './App';
import {getMockStore} from './test-utils/mocks';
import {history} from './store/store';


const stubInitialState1 = {
    isLoggedIn: true,
    user: {username: 'test_name'},
    mySubjectList: [
        {id: 1, name: 'subject1', description: 'ds', days: [{day: 0, start_time: '10:00', end_time: '12:00'}], user: 1},
        {id: 2, name: 'subject2', description: '', days: [{day: 0, start_time: '10:00', end_time: '12:00'}], user: 1}
    ],
    myGroupList: [
        {id: 1, name: 'test', description: null, time: 'P0DT10H42M00S', members: 2},
        {id: 2, name: 'test2', description: null, time: 'P0DT10H41M00S', members: 1},
    ],
}
const mockStore1 = getMockStore(stubInitialState1);
describe('App', () => {
    let app, spyGetLogin;

    beforeEach(() => {
        app = (
            <Provider store={mockStore1}>
                <App history={history}/>
            </Provider>
        );
        spyGetLogin = jest.spyOn(actionCreators, 'getLogin')
            .mockImplementation(() => {
                return () => {
                };
            })
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render', () => {
        const component = mount(app);
        expect(component.find('.App').length).toBe(1);
    });
    it('should signout when click logoutHandler', () => {
        const spySignout = jest.spyOn(actionCreators, 'signout')
            .mockImplementation(() => {
                return () => {
                };
            });
        const component = mount(app);
        const wrapper = component.find('#logout-button').at(0);
        wrapper.simulate('click');
        expect(spySignout).toHaveBeenCalledTimes(1);
    });
    it(`should call 'gotoHome'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(app);
        const wrapper = component.find('#home-link').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/');
    });
    it(`should call 'gotoGroup'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(app);
        const wrapper = component.find('#group-link').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/group');
    });
    it(`should call 'gotoSubject'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(app);
        const wrapper = component.find('#subject-link').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/subject');
    });
    it(`should call 'gotoRank'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(app);
        const wrapper = component.find('#rank-link').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/ranking');
    });
    it(`should call 'gotoStat'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(app);
        const wrapper = component.find('#stat-link').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/statistic');
    });


});

const stubInitialState2 = {
    isLoggedIn: false,
    user: {username: 'test_name'}
}
const mockStore2 = getMockStore(stubInitialState2);
describe('App', () => {
    let app, spyGetLogin;

    beforeEach(() => {
        app = (
            <Provider store={mockStore2}>
                <App history={history}/>
            </Provider>
        );
        spyGetLogin = jest.spyOn(actionCreators, 'getLogin')
            .mockImplementation(() => {
                return () => {
                };
            })
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render', () => {
        const component = mount(app);
        expect(component.find('.App').length).toBe(1);
    });
});