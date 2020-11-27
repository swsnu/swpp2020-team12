/* eslint-disable no-unused-vars */
import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import MainPage from './mainPage';
import {getMockStore} from '../../test-utils/mocks';
import {history} from '../../store/store';
import Button from "react-bootstrap/Button";
import * as actionStudy from "../../store/actions/study";
import Groups from "../groups/groups";


const stubInitialState = {
    user: [
        {id: 1, username: 'test', password: "test1234", name: "testname", message: "hi"},
    ],
    mySubjectList: [
        {id: 1, name: 'subject1', description: 'ds', days: [{day: 0, start_time: '10:00', end_time: '12:00'}], user: 1},
        {id: 2, name: 'subject2', description: '', days: [{day: 0, start_time: '10:00', end_time: '12:00'}], user: 1}
    ],
    myGroupList: [
        {id: 1, name: 'group1', description: null, time: 'P0DT10H42M00S', members: 2},
        {id: 2, name: 'group2', description: null, time: 'P0DT10H41M00S', members: 1},
    ],
};
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
            <div className="spySubject">
                <button id='closeButton' onClick={props.handleSubjectShow}/>
                {subjects}
                <button disabled={props.subject === null} id="to-group-button"
                        onClick={props.onClickChoose}>Choose Subject
                </button>
            </div>
        );
    });
})
jest.mock('./selectGroup/selectGroup', () => {
    return jest.fn(props => {
        const groups = props.myGroupList.map(group => {
            return (
                <div className='group' key={group.id}>
                    {group.name}
                    <input type='checkbox' checked={props.group === group.id}
                           onClick={() => props.onClickCheck(group.id)}/>
                </div>
            )
        })
        return (
            <div className="spyGroup">
                {groups}
                <button disabled={props.group===-1} id="start-study-button"
                onClick={props.onClickChoose}>Choose Group</button>
            </div>
        );
    });
})


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
    it('should call show subject -> group modal if study button is clicked', () => {
        const spyStartStudy = jest.spyOn(actionStudy, 'startStudy')
            .mockImplementation(id => {
                return dispatch => {
                };
            });
        const component = mount(mainPage);
        let wrapper = component.find('#study-button span');
        wrapper.simulate('click');
        const newInstance = component.find(MainPage.WrappedComponent).instance();
        expect(newInstance.state.subjectShow).toEqual(true);
        wrapper = component.find('.subject input').at(0);
        wrapper.simulate('click');
        expect(newInstance.state.subject).toEqual('subject1');
        wrapper = component.find('#to-group-button');
        wrapper.simulate('click');
        const newInstance2 = component.find(MainPage.WrappedComponent).instance();
        expect(newInstance2.state.subjectShow).toEqual(false);
        expect(newInstance2.state.groupShow).toEqual(true);
        wrapper = component.find('.group input').at(0);
        wrapper.simulate('click');
        expect(newInstance.state.group_id).toEqual(1);
        wrapper = component.find('#start-study-button');
        wrapper.simulate('click');
        expect(spyStartStudy).toHaveBeenCalledTimes(1);
    });
});


