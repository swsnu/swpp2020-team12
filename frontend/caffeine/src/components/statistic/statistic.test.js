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
import moment from 'moment'

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
    it('should onChange', () => {
        const spyGetMonthlydata = jest.spyOn(actionCreators, 'getMonthlydata')
            .mockImplementation(() => {
                return () => {
                };
            });
        const spygetWeeklydata = jest.spyOn(actionCreators, 'getWeeklydata')
            .mockImplementation(() => {
                return () => {
                };
            });
        const spygetDailySubject = jest.spyOn(actionCreators, 'getDailySubject')
            .mockImplementation(() => {
                return () => {
                };
            });
        const component = mount(statistic);
        let wrapper = component.find('button').at(10)
        wrapper.simulate('click');
    });
});