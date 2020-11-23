/* eslint-disable no-unused-vars */
import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import MainPage from './mainPage';
import {getMockStore} from '../../test-utils/mocks';
import {history} from '../../store/store';


const stubInitialState = {
    user: [
        {id: 1, username: 'test', password: "test1234", name: "testname", message: "hi"},
    ],
};

const mockStore = getMockStore(stubInitialState);

describe('<mainPage />', () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    let mainPage
    beforeEach(() => {
        mainPage = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={MainPage}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    })


    it('should render without errors', () => {
        const component = mount(mainPage);
        expect(component.length).toBe(1);
    });

    it(`should call 'handlerCancel'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(mainPage);
        const wrapper = component.find('#group');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it(`should go to subject page`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(mainPage);
        const wrapper = component.find('#subject');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it(`should go to group page`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(mainPage);
        const wrapper = component.find('#group');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it(`should go to ranking page`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(mainPage);
        const wrapper = component.find('#ranking');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it(`should go to statistic page`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(mainPage);
        const wrapper = component.find('#statistic');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});


