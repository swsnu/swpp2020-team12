/* eslint-disable no-unused-vars */
import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import Groups from './groups';
import * as actionCreators from '../../store/actions/groups';
import * as actionStudy from '../../store/actions/study';
import {getMockStore} from '../../test-utils/mocks';
import {history} from '../../store/store';

const mockgroup = {
    id: 1,
    name: "test1",
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
    password: null,
    time: "1hour",
    description: "studying",
    active_count: 1
}
const stubInitialState = {
    myGroupList: [
        {id: 1, name: 'test', description: null, time: 'P0DT10H42M00S', members: 3, active_count: 1},
        {id: 2, name: 'test2', description: null, time: 'P0DT10H41M00S', members: 5, active_count: 5},
    ],
    searchGroupList: [{id: 3, name: 'abcd', description: null, time: 'P0DT10H41M00S', members: 1}],
    specificGroupInfo: mockgroup,
    mySubjectList: [
        {id: 1, name: 'subject1', description: 'ds', days: [{day: 0, start_time: '10:00', end_time: '12:00'}]},
        {id: 2, name: 'subject2', description: '', days: [{day: 0, start_time: '10:00', end_time: '12:00'}]}
    ]
};
jest.mock('./createGroup/createGroup', () => {
    return jest.fn(props => {
        return (
            <div className='spycreate'>
                <input id='create-group-name-input' value={props.name} placeholder="Group Name"
                       onChange={(event) => props.onChangeName(event)}/>
                <input id='create-group-announce-input' type="name" value={props.announcement}
                       placeholder="Group Announcement"
                       onChange={(event) => props.onChangeAnnounce(event)}/>
                <input id='create-group-password-input' value={props.password} placeholder="it is optional"
                       onChange={(event) => props.onChangePassword(event)}/>
                <button id="back-newGroup-button" onClick={props.handleCreateShow}>back</button>
                <button id="confirm-newGroup-button" onClick={props.onClickConfirm}>confirm</button>
            </div>
        );
    })
})
jest.mock('../study/selectSubject/selectSubject', () => {
    return jest.fn(props => {
        const subjects = props.mySubjectList.map(subject => {
            return (
                <div className='subject' key={subject.id}>
                    {subject.name}
                    <input type='checkbox' checked={props.subject === subject.name}
                           onClick={() => props.onClickCheck(subject.name)}/>
                </div>
            )
        })
        return (
            <div className="spysubject">
                <button id='closeButton' onClick={props.onSubjectShow}></button>
                {subjects}
                <button size="sm" disabled={props.subject === null} id="start-study-button"
                        onClick={props.onClickChoose}>Choose Subject
                </button>
            </div>
        );
    });
})
jest.mock('./userGroupInfo/userGroupInfo', () => {
    return jest.fn(props => {
        const memberList = props.members.map(user => {
            return (
                <li key={user.id}>
                    <div className="name"><h3>{user.name}</h3><h4>{user.studyhour}</h4></div>
                    <h4>{user.message}</h4>
                </li>
            );
        })
        return (
            <div className='spyinfo'>
                <button id='closeButton' onClick={props.handleDetailShow}></button>
                <ul>
                    {memberList}
                </ul>
                <button id="quit-group-button" onClick={props.onClickQuit}>leave group</button>
                <button id="join-study-button" onClick={()=>props.onClickStudy(props.activeCount)}>study with me!</button>
            </div>
        )
    })
})
const mockStore = getMockStore(stubInitialState);

describe('<Groups />', () => {
    let groups, spygetGroups;

    beforeEach(() => {
        groups = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={Groups}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spygetGroups = jest.spyOn(actionCreators, 'getGroups')
            .mockImplementation(() => {
                return () => {
                };
            });
    })
    afterEach(() => {
        jest.clearAllMocks()
    });
    it('should render Groups', () => {
        const component = mount(groups);
        const wrapper = component.find('#name');
        expect(wrapper.length).toBe(4);
        expect(spygetGroups).toBeCalledTimes(1);
    });
    it(`should call 'clickGroupHandler'`, () => {
        const spygetGroups = jest.spyOn(actionCreators, 'getGroup')
            .mockImplementation(() => {
                return () => {
                };
            });
        const component = mount(groups);
        const wrapper = component.find('#name').at(0);
        wrapper.simulate('click');
        expect(spygetGroups).toHaveBeenCalledTimes(1);
        const newInstance = component.find(Groups.WrappedComponent).instance();
        expect(newInstance.state.detailShow).toEqual(true);
    });
    it(`should call 'searchHandler'`, () => {
        const spysearchGroups = jest.spyOn(actionCreators, 'SearchGroups')
            .mockImplementation(id => {
                return () => {
                };
            });
        const component = mount(groups);
        const wrapper = component.find('#group-search-button').at(0);
        wrapper.simulate('click');
        expect(spysearchGroups).toHaveBeenCalledTimes(1);
    });
    it(`should change 'createShow' `, () => {
        const component = mount(groups);
        const wrapper = component.find('#create-group-button').at(0);
        wrapper.simulate('click');
        const newInstance = component.find(Groups.WrappedComponent).instance();
        expect(newInstance.state.createShow).toEqual(true);
    });
    it(`should call 'clickSearchedGroupHandler'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(groups);
        const wrapper = component.find('#searched li');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/group/3');
    });
    it(`should change 'search-input'`, () => {
        const component = mount(groups);
        const wrapper = component.find('#group-search-input');
        wrapper.simulate('change', {target: {value: '1234'}});
        const newInstance = component.find(Groups.WrappedComponent).instance();
        expect(newInstance.state.group_name).toEqual('1234');
    });
   /* it(`should redirect to main`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(groups);
        const wrapper = component.find('#home');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/');
    });
    */
    it(`should chage state as input chaged but push back change nothing`, () => {
        const spyadd = jest.spyOn(actionCreators, 'addGroup')
            .mockImplementation(id => {
                return dispatch => {
                };
            });
        const component = mount(groups);
        let wrapper = component.find('#create-group-button').at(0);
        wrapper.simulate('click');
        wrapper = component.find('.spycreate');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('#create-group-name-input');
        wrapper.simulate('change', {target: {value: "test"}});
        const newInstance = component.find(Groups.WrappedComponent).instance();
        expect(newInstance.state.name).toEqual('test');
        wrapper = component.find('#create-group-announce-input');
        wrapper.simulate('change', {target: {value: "testing"}});
        expect(newInstance.state.announcement).toEqual('testing');
        wrapper = component.find('#create-group-password-input');
        wrapper.simulate('change', {target: {value: "1234"}});
        expect(newInstance.state.password).toEqual('1234');
        wrapper = component.find('#back-newGroup-button');
        wrapper.simulate('click');
        expect(newInstance.state.createShow).toEqual(false);
        expect(spyadd).toHaveBeenCalledTimes(0);
    });
    it(`should call addgroup as push confirm button`, () => {
        const spyadd = jest.spyOn(actionCreators, 'addGroup')
            .mockImplementation(id => {
                return dispatch => {
                };
            });
        const component = mount(groups);
        let wrapper = component.find('#create-group-button').at(0);
        wrapper.simulate('click');
        wrapper = component.find('.spycreate');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('#create-group-name-input');
        wrapper.simulate('change', {target: {value: "test"}});
        const newInstance = component.find(Groups.WrappedComponent).instance();
        expect(newInstance.state.name).toEqual('test');
        wrapper = component.find('#create-group-announce-input');
        wrapper.simulate('change', {target: {value: "testing"}});
        expect(newInstance.state.announcement).toEqual('testing');
        wrapper = component.find('#create-group-password-input');
        wrapper.simulate('change', {target: {value: "1234"}});
        expect(newInstance.state.password).toEqual('1234');
        wrapper = component.find('#confirm-newGroup-button');
        wrapper.simulate('click');
        expect(newInstance.state.createShow).toEqual(false);
        expect(spyadd).toHaveBeenCalledTimes(1);
    });
    it('should call show group info and leave group if click button', () => {
        const spygetGroups = jest.spyOn(actionCreators, 'getGroup')
            .mockImplementation(id => {
                return dispatch => {
                };
            });
        const spydeleteGroups = jest.spyOn(actionCreators, 'deleteGroup')
            .mockImplementation(id => {
                return dispatch => {
                };
            });
        const component = mount(groups);
        let wrapper = component.find('#name').at(0);
        wrapper.simulate('click');
        expect(spygetGroups).toHaveBeenCalledTimes(1);
        const newInstance = component.find(Groups.WrappedComponent).instance();
        expect(newInstance.state.detailShow).toEqual(true);
        wrapper = component.find('.spyinfo');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('h4');
        expect(wrapper.length).toBe(6);
        wrapper = component.find('#quit-group-button');
        wrapper.simulate('click');
        expect(newInstance.state.detailShow).toEqual(false);
        expect(spydeleteGroups).toHaveBeenCalledTimes(1);
    });
    it('should call show subject selection modal if study button is clicked', () => {
        const spystartStudy = jest.spyOn(actionStudy, 'startStudy')
            .mockImplementation(id => {
                return dispatch => {
                };
            });
        const component = mount(groups);
        let wrapper = component.find('#name').at(0);
        wrapper.simulate('click');
        wrapper = component.find('#join-study-button');
        wrapper.simulate('click');
        const newInstance = component.find(Groups.WrappedComponent).instance();
        expect(newInstance.state.detailShow).toEqual(false);
        expect(newInstance.state.subjectShow).toEqual(true);
        wrapper = component.find('.subject input').at(0);
        wrapper.simulate('click');
        expect(newInstance.state.subject).toEqual('subject1');
        wrapper = component.find('#start-study-button');
        wrapper.simulate('click');
        expect(spystartStudy).toHaveBeenCalledTimes(1);
    });
    it('should end  modal if close button is clicked', () => {
        const component = mount(groups);
        let wrapper = component.find('#name').at(0);
        wrapper.simulate('click');
        wrapper = component.find('#join-study-button');
        wrapper.simulate('click');
        const newInstance = component.find(Groups.WrappedComponent).instance();
        expect(newInstance.state.detailShow).toEqual(false);
        expect(newInstance.state.subjectShow).toEqual(true);
        wrapper = component.find('#closeButton').at(0);
        wrapper.simulate('click');
    });
    it('should call not show subject if active count >= 5', () => {
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        const component = mount(groups);
        let wrapper = component.find('#name').at(1);
        wrapper.simulate('click');
        wrapper = component.find('#join-study-button');
        wrapper.simulate('click');
        const newInstance = component.find(Groups.WrappedComponent).instance();
        expect(newInstance.state.detailShow).toEqual(false);

    });
});


const mockgroup1 = {
    id: 1,
    name: "test1",
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
    password: null,
    time: "1hour",
    description: "studying",
    active_count: 5
}
const stubInitialState1 = {
    myGroupList: [
        {id: 1, name: 'test', description: null, time: 'P0DT10H42M00S', members: 3, active_count: 1},
        {id: 2, name: 'test2', description: null, time: 'P0DT10H41M00S', members: 5, active_count: 5},
    ],
    searchGroupList: [{id: 3, name: 'abcd', description: null, time: 'P0DT10H41M00S', members: 1}],
    specificGroupInfo: mockgroup1,
    mySubjectList: [
        {id: 1, name: 'subject1', description: 'ds', days: [{day: 0, start_time: '10:00', end_time: '12:00'}]},
        {id: 2, name: 'subject2', description: '', days: [{day: 0, start_time: '10:00', end_time: '12:00'}]}
    ]
};
const mockStore1 = getMockStore(stubInitialState1);

describe('<Groups />', () => {
    let groups, spygetGroups;

    beforeEach(() => {
        groups = (
            <Provider store={mockStore1}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={Groups}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spygetGroups = jest.spyOn(actionCreators, 'getGroups')
            .mockImplementation(() => {
                return () => {
                };
            });
    })
    afterEach(() => {
        jest.clearAllMocks()
    });
    it('should call not show subject if active count >= 5', () => {
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        const component = mount(groups);
        let wrapper = component.find('#name').at(1);
        wrapper.simulate('click');
        wrapper = component.find('#join-study-button');
        wrapper.simulate('click');
        const newInstance = component.find(Groups.WrappedComponent).instance();
        expect(newInstance.state.detailShow).toEqual(false);
        expect(mockAlert).toHaveBeenCalled();
    });
});