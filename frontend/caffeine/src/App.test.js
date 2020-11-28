import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import * as actionCreators from './store/actions/user';
import App from './App';
import {getMockStore} from './test-utils/mocks';
import {history} from './store/store';
import * as actionStudy from "./store/actions/study";


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
                return dispatch => {
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
                return dispatch => {
                };
            });
        const component = mount(app);
        const wrapper = component.find('#logout-button')
        wrapper.simulate('click');
        expect(spySignout).toHaveBeenCalledTimes(1);
    });
    it('should redirect to home when click homeHandler', () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(app);
        const wrapper = component.find('#home-button')
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
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
                return dispatch => {

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