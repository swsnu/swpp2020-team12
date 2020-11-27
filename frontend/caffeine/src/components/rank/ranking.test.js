import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import Ranking from './ranking';
import {getMockStore} from '../../test-utils/mocks';
import {history} from '../../store/store';
import * as actionCreators from "../../store/actions/ranking";

const mockStore = getMockStore(stubInitialState);

describe('<Rankings />', () => {
    let ranking, spyGetAllGroups, spyUserDayRank, spyGroupDayRank;

    beforeEach(() => {
        ranking = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={Rankings}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyGroupDayRank = jest.spyOn(actionCreators, 'getGroupDayRank')
            .mockImplementation(() => {
                return () => {
                };
            });
        spyGroupDayRank = jest.spyOn(actionCreators, 'getGroupDayRank')
            .mockImplementation(() => {
                return () => {
                };
            });
        spyGroupDayRank = jest.spyOn(actionCreators, 'getGroupDayRank')
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
        const wrapper = component.find('#name');
        expect(wrapper.length).toBe(2);
        expect(spygetRankings).toBeCalledTimes(1);
    });
});
    