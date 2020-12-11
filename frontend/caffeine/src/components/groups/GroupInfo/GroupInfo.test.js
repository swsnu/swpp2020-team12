/* eslint-disable no-unused-vars */
import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import GroupInfo from './GroupInfo';
import * as actionCreators from '../../../store/actions/groups';
import {getMockStore} from '../../../test-utils/mocks';
import {history} from '../../../store/store';

const mockGroup1 = {
    id: 3,
    name: "test3",
    members: [
        {
            "id": 1,
            "name": "tesuser1",
            "studyhour": "2hour",
            "message": "I'm good"
        },
        {
            "id": 2,
            "name": "tesuser2",
            "studyhour": "1hour",
            "message": "2"
        },
        {
            "id": 3,
            "name": "tesuser3",
            "studyhour": "42minutes",
            "message": ""
        }
    ],
    password: 'pw',
    time: "1hour",
    description: "studying"
}
const mockGroup2 = {
    id: 3,
    name: "test3",
    members: [
        {
            "id": 1,
            "name": "tesuser1",
            "studyhour": "2hour",
            "message": "I'm good"
        },
        {
            "id": 2,
            "name": "tesuser2",
            "studyhour": "1hour",
            "message": "2"
        },
        {
            "id": 3,
            "name": "tesuser3",
            "studyhour": "42minutes",
            "message": ""
        }
    ],
    password: '',
    time: "1hour",
    description: "studying"
}
const stubInitialState = {
    myGroupList: [
        {id: 1, name: 'test', description: null, time: 'P0DT10H42M00S', members: 2},
        {id: 2, name: 'test2', description: null, time: 'P0DT10H41M00S', members: 1},
    ],
    unenrolledGroupInfo: mockGroup1
};
const mockStore = getMockStore(stubInitialState);

describe('<GroupInfo />', () => {
    let groups, spyGetGroup;

    beforeEach(() => {
        groups = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={GroupInfo}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyGetGroup = jest.spyOn(actionCreators, 'getunEnrolled')
            .mockImplementation(() => {
                return () => {
                };
            });
    })
    afterEach(() => {
        jest.clearAllMocks()
    });
    it('should render GroupInfo', () => {
        const component = mount(groups);
        expect(spyGetGroup).toBeCalledTimes(1);
        const wrapper = component.find('.GroupInfo');
        expect(wrapper.length).toBe(1);
        const wrapper_name = component.find('#GroupName');
        expect(wrapper_name.length).toBe(1);
    });

    it('should goto group when click cancel button', () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => {
            });
        const component = mount(groups);
        const wrapper = component.find('#cancel-button');
        wrapper.at(0).simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/group');
    });

    it('should join group when click join button', () => {
        const spyJoinGroup = jest.spyOn(actionCreators, 'joinGroup')
            .mockImplementation( () => {
                return () => {
                };
            });
        window.prompt = jest.fn().mockImplementation(() => 'pw');
        const component = mount(groups);
        const wrapper = component.find('#join-group-button');
        wrapper.at(0).simulate('click');
        expect(window.prompt).toHaveReturnedWith('pw');
        expect(spyJoinGroup).toHaveBeenCalledTimes(1)
    });
});


const stubInitialState2 = {
    myGroupList: [
        {id: 1, name: 'test', description: null, time: 'P0DT10H42M00S', members: 2},
        {id: 2, name: 'test2', description: null, time: 'P0DT10H41M00S', members: 1},
    ],
    unenrolledGroupInfo: null,
};
const mockStore2 = getMockStore(stubInitialState2);

describe('<GroupInfo />', () => {
    let groups
    beforeEach(() => {
        groups = (
            <Provider store={mockStore2}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={GroupInfo}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

    })
    afterEach(() => {
        jest.clearAllMocks()
    });
    it('should not render GroupInfo when unenrolled groupInfo is null', () => {
        const component = mount(groups);
        const wrapper = component.find('.GroupInfo');
        expect(wrapper.length).toBe(1);
        const wrapper_name = component.find('#GroupName');
        expect(wrapper_name.length).toBe(0);

    });
});

const stubInitialState3 = {
    myGroupList: [
        {id: 1, name: 'test', description: null, time: 'P0DT10H42M00S', members: 2},
        {id: 2, name: 'test2', description: null, time: 'P0DT10H41M00S', members: 1},
    ],
    unenrolledGroupInfo: mockGroup2,
};

const mockStore3 = getMockStore(stubInitialState3);

describe('<GroupInfo />', () => {
    let groups
    beforeEach(() => {
        groups = (
            <Provider store={mockStore3}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={GroupInfo}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

    })
    afterEach(() => {
        jest.clearAllMocks()
    });
    it('should join group when click join button wihtout passwd', () => {
        const spyJoinGroup = jest.spyOn(actionCreators, 'joinGroup')
            .mockImplementation( () => {
                return () => {
                };
            });
        const component = mount(groups);
        const wrapper = component.find('#join-group-button');
        wrapper.at(0).simulate('click');
        expect(spyJoinGroup).toHaveBeenCalledTimes(1)
    });
});