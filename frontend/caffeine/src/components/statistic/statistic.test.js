/* eslint-disable no-unused-vars */
import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import Statistic from './statistic';
import {getMockStore} from '../../test-utils/mocks';
import {history} from '../../store/store';
import * as actionCreators from '../../store/actions/statistic';
import * as actionCreatorss from '../../store/actions/user'

const stubStatisticState = {
    monthlyData: [
        {date: '2020-11-01', count: 0},
    ],
    weeklyData: null,
    weekly_total: null,
    weekly_study_time: null,
    dailyData: null,
    daily_total: null,
    daily_study_time: null
};

const mockStore = getMockStore(stubStatisticState);

describe('<Statistic />', () => {
    let statistic, spygetDailySubject, spyGetMonthlydata, spygetWeeklydata;

    afterEach(() => {
        jest.clearAllMocks();
    })

    beforeEach(() => {
        statistic = (
            <Provider store={mockStore}>
                <Router history={history}>
                    <Switch>
                        <Route path='/' exact component={Statistic}/>
                    </Switch>
                </Router>
            </Provider>
        );
        spyGetMonthlydata = jest.spyOn(actionCreators, 'getMonthlydata')
            .mockImplementation(() => {
                return () => {
                };
            });
        spygetWeeklydata = jest.spyOn(actionCreators, 'getWeeklydata')
            .mockImplementation(() => {
                return () => {
                };
            });
        spygetDailySubject = jest.spyOn(actionCreators, 'getDailySubject')
            .mockImplementation(() => {
                return () => {
                };
            });
    })
    it('should render without errors', () => {
        const component = mount(statistic);
        expect(component.length).toBe(1);
    });
/*    it(`should go to main page`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => {
            });
        const component = mount(statistic);
        const wrapper = component.find('.gotoMainbutton');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it(`should go to subject page`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => {
            });
        const component = mount(statistic);
        const wrapper = component.find('.gotoSubjectbutton');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it(`should go to group page`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(statistic);
        const wrapper = component.find('.gotoGroupbutton');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it(`should go to statistic page`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => {
            });
        const component = mount(statistic);
        const wrapper = component.find('.gotoStatisticbutton');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it(`should go to ranking page`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => {
            });
        const component = mount(statistic);
        const wrapper = component.find('.gotoRankingbutton');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    it(`should signout`, () => {
        const signOut = jest.spyOn(actionCreatorss, 'signout')
            .mockImplementation(() => {
                return () => {
                };
            });
        const component = mount(statistic);
        const wrapper = component.find('.Signoutbutton');
        wrapper.simulate('click');
        expect(signOut).toHaveBeenCalledTimes(1);
    });
 */
});