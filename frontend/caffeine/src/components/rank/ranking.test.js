/* eslint-disable no-unused-vars */
import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import Ranking from './ranking';
import {getMockStore} from '../../test-utils/mocks';
import {history} from '../../store/store';
import * as actionCreators from "../../store/actions/ranking";
import * as actionGroup from "../../store/actions/groups";


const stubInitialState = {
    myGroupList: [
        {id: 1, name: 'test', description: null, time: 'P0DT10H42M00S', members: 2},
        {id: 2, name: 'test2', description: null, time: 'P0DT10H41M00S', members: 1},
    ],
    userRank: [
        {name: 'nickname2', time: 'P0DT01H42M00S'},
        {name: 'nickname1', time: 'P0DT01H30M00S'},
        {name: 'nickname3', time: 'P0DT01H00M00S'},
        {name: 'nickname4', time: 'P0DT00H00M00S'},
    ],
    myUserRank: {
        rank: 2,
        record: {name: 'nickname1', time: 'P0DT01H30M00S'}
    },
    groupRank: [
        {name: 'nickname2', time: 'P0DT01H42M00S'},
        {name: 'nickname1', time: 'P0DT01H30M00S'},
        {name: 'nickname4', time: 'P0DT00H00M00S'},
    ],
    myGroupRank: {
        rank: 2,
        record: {name: 'nickname1', time: 'P0DT01H30M00S'}
    }
};

const mockStore = getMockStore(stubInitialState);

describe('<Rankings />', () => {
    let ranking, spyGetAllGroups, spyUserDayRank, spyGroupDayRank;

    beforeEach(() => {
        ranking = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={Ranking}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyGetAllGroups = jest.spyOn(actionGroup, 'getGroups')
            .mockImplementation(() => {
                return () => {
                };
            });
        spyGroupDayRank = jest.spyOn(actionCreators, 'getGroupDayRank')
            .mockImplementation(() => {
                return () => {
                };
            });
        spyUserDayRank = jest.spyOn(actionCreators, 'getUserDayRank')
            .mockImplementation(() => {
                return () => {
                };
            });
    })
    afterEach(() => {
        jest.clearAllMocks()
    });
    it('should render Rankings', () => {
        const component = mount(ranking);
        const wrapper = component.find('.table');
        expect(wrapper.length).toBe(2);
        expect(spyGetAllGroups).toBeCalledTimes(1);
        expect(spyGroupDayRank).toBeCalledTimes(1);
        expect(spyUserDayRank).toBeCalledTimes(1);
    });
    it(`should toggle rank day-total when click 'onChangeDuration'`, () => {
        const spyGroupTotalRank = jest.spyOn(actionCreators, 'getGroupTotalRank')
            .mockImplementation(() => {
                return () => {
                };
            });
        const spyUserTotalRank = jest.spyOn(actionCreators, 'getUserTotalRank')
            .mockImplementation(() => {
                return () => {
                };
            });
        const component = mount(ranking);
        const wrapper_click1 = component.find('#show-total-rank').at(0);
        wrapper_click1.simulate('click');
        expect(spyGroupTotalRank).toHaveBeenCalledTimes(1);
        expect(spyUserTotalRank).toHaveBeenCalledTimes(1);
        const wrapper_click2 = component.find('#show-day-rank').at(0);
        wrapper_click2.simulate('click');
        expect(spyGroupDayRank).toHaveBeenCalledTimes(2);
        expect(spyUserDayRank).toHaveBeenCalledTimes(2);
    });
    it(`should change group when click 'ChangeGroup'`, () => {
        const component = mount(ranking);
        const wrapper = component.find('#group-select');
        let group_id=1;
        wrapper.simulate('change', {target: {value: group_id}});
        const newInstance = component.find(Ranking.WrappedComponent).instance();
        expect(newInstance.state.selectedGroupId).toEqual(group_id);

    });
    it(`should change call total rank of group click 'ChangeGroup'`, () => {
        const spyUserTotalRank = jest.spyOn(actionCreators, 'getUserTotalRank')
        .mockImplementation(() => {
            return () => {
            };
        });
        const component = mount(ranking);
        const wrapper_click1 = component.find('#show-total-rank').at(0);
        wrapper_click1.simulate('click');
        const wrapper = component.find('#group-select');
        let group_id=1;
        wrapper.simulate('change', {target: {value: group_id}});
        const newInstance = component.find(Ranking.WrappedComponent).instance();
        expect(newInstance.state.selectedGroupId).toEqual(group_id);
        expect(spyUserTotalRank).toHaveBeenCalledTimes(1);
    });
});
    