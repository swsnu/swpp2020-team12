/* eslint-disable no-unused-vars */
import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import Study from './study';
import thunk from 'redux-thunk';
import Webcam from 'react-webcam'
import * as actionSubjects from '../../store/actions/subjects';
import * as actionStudy from '../../store/actions/study';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createBrowserHistory} from 'history';
import moment from 'moment'
import * as actionTypes from '../../store/actions/actionTypes'
import WS from "jest-websocket-mock";
import axios from "axios";

jest.mock('./selectSubject/selectSubject', () => {
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
                <button id='closeButton' onClick={props.handleSubjectShow}></button>
                {subjects}
                <button size="sm" disabled={props.subject === null} id="start-study-botton"
                        onClick={props.onClickChoose}>Choose Subject
                </button>
            </div>
        );
    });
})

jest.mock('./studycomponent/studycomp', () => {
    return jest.fn(props => {
        return (
            <div className="spycomp">
                <span id="name">{props.name}</span><br></br>
                <span id="state">{props.state}</span>
            </div>
        );
    });
});
jest.mock('./studycomponent/studycomp', () => {
    return jest.fn(props => {
        return (
            <div className="spycomp">
                <span id="name">{props.name}</span><br></br>
                <span id="state">{props.state}</span>
            </div>
        );
    });
});
const history = createBrowserHistory();
const stubstudylState = {
    status: null,
    gauge: null,
    subject: 'test2',
    memberlist: [
        {user__id: 1, user__name: 'test', concentration_gauge: 0.5, user__message: "testing"},
        {user__id: 2, user__name: 'test2', concentration_gauge: 0.7, user__message: "testing"}
    ]
};
const stubsubjectState = {
    mySubjectList: [
        {id: '1', name: 'test1'},
        {id: '2', name: 'test2'}
    ]
};
const stubUserState = {
    user: [
        {id: '1', name: 'user1'}
    ],
    isLoggedIn: true
};
const getMockStudyReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            case actionTypes.CHANGE_SUBJECT:
                return {...state, status: null, gauge: null, subject: action.subject}
            default:
                break;
        }
        return state;
    }
);
const getMockSubjectReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);
const getMockUserReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const mockStudyReducer = getMockStudyReducer(stubstudylState);
const mockSubjectReducer = getMockSubjectReducer(stubsubjectState);
const mockUserReducer = getMockSubjectReducer(stubUserState);
const rootReducer = combineReducers({
    subject: mockSubjectReducer,
    study: mockStudyReducer,
    user: mockUserReducer,
});
const mockStore = createStore(rootReducer, applyMiddleware(thunk));


describe('<Study />', () => {
    let study, spygetSubjects, server;
    beforeEach(() => {
        server = new WS("ws://localhost:8000", {jsonProtocol: true});
        jest.useFakeTimers();
        history.push('/1')
        study = (
            <Provider store={mockStore}>
                <Router history={history}>
                    <Switch>
                        <Route path='/:group_id' component={Study}/>
                    </Switch>
                </Router>
            </Provider>
        );
        spygetSubjects = jest.spyOn(actionSubjects, 'getSubjects')
            .mockImplementation(() => {
                return dispatch => {
                };
            });
        jest.spyOn(axios, 'post')
            .mockImplementation((url, ar) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,

                    };
                    resolve(result);
                });
            })
        jest.spyOn(axios, 'put')
            .mockImplementation((url, ar) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                    };
                    resolve(result);
                });
            })
    })
    afterEach(() => {
        jest.clearAllMocks();
        WS.clean();
    });
    it('should update if inference data is come from ws', () => {
        const component = mount(study);
        setTimeout(() => {
            server.connected;
        }, 10);
        jest.runOnlyPendingTimers();
        server.send({inference: {user__id: 1, gauge: 0.3}})
        server.send({join: {user__id: 3, user__name: 'test3', user__message: "testing"}})
        server.send({leave: {user__id: 2}})
        server.send({})
        component.unmount();
    });
    it('should render Study', async () => {
        console.log = jest.fn();
        const component = mount(study);
        await component.find('#open-eye').simulate('click');
        component.update();
        await component.find('#close-eye').simulate('click');
        component.update();
        //await component.find('#close-eye').simulate('click');

        jest.advanceTimersByTime(1000);
        let wrapper = component.find('Webcam')
        expect(wrapper.length).toBe(1);
        expect(spygetSubjects).toBeCalledTimes(1);
        wrapper = component.find('.spycomp')
        expect(wrapper.length).toBe(1);
        expect(console.log).toHaveBeenCalledWith('started');
        const componentWillUnmount = jest.spyOn(Study.WrappedComponent.prototype, 'componentWillUnmount');
        component.unmount();
        expect(componentWillUnmount).toHaveBeenCalled();
    });
    it('should render change time', async () => {
        const component = mount(study);
        await component.find('#open-eye').simulate('click');
        component.update();
        await component.find('#close-eye').simulate('click');
        component.update();
        jest.advanceTimersByTime(1000);
        let newstudyinstance = component.find(Study.WrappedComponent).instance();
        expect(newstudyinstance.state.time.seconds()).toEqual(1);
        component.unmount();
    });
    it('should render take picture at 10seconds and post it to server', async () => {
        const spypost = jest.spyOn(actionStudy, 'postCapturetoServer')
            .mockImplementation(() => {
                return dispatch => {
                };
            });
        /*const spy = jest.spyOn(Webcam, 'getScreenshot')
            .mockImplementation(url => {
                return 'img,DBJBJKSNDOQ'
            })*/
        const component = mount(study);
        await component.find('#open-eye').simulate('click');
        component.update();
        await component.find('#close-eye').simulate('click');
        component.update();
        await Promise.resolve();
        let newInstance = component.find(Study.WrappedComponent).instance();
        expect(newInstance.state.closeEyeShow).toEqual(false);
        jest.advanceTimersByTime(12000);
        let newstudyinstance = component.find(Study.WrappedComponent).instance();
        expect(newstudyinstance.state.time.seconds()).toEqual(12);
        expect(spypost).toBeCalledTimes(1);
        component.unmount();
    });
    it('should change modal show state when click button', async () => {
        const component = mount(study);
        await component.find('#open-eye').simulate('click');
        component.update();
        await component.find('#close-eye').simulate('click');
        component.update();
        jest.advanceTimersByTime(1000);
        let wrapper = component.find('#change-subject-button')
        wrapper.simulate('click')
        let newstudyinstance = component.find(Study.WrappedComponent).instance();
        expect(newstudyinstance.state.subjectShow).toBe(true);
        wrapper = component.find('.spysubject');
        expect(wrapper.length).toBe(1);
        component.unmount();
    });
    it('should exit modal when click button', async () => {
        const component = mount(study);
        await component.find('#open-eye').simulate('click');
        component.update();
        await component.find('#close-eye').simulate('click');
        component.update();
        jest.advanceTimersByTime(1000);
        let wrapper = component.find('#change-subject-button')
        wrapper.simulate('click')
        let newstudyinstance = component.find(Study.WrappedComponent).instance();
        expect(newstudyinstance.state.subjectShow).toBe(true);
        wrapper = component.find('#closeButton');
        wrapper.simulate('click');
        expect(newstudyinstance.state.subjectShow).toBe(false);
        component.unmount();
    });
    it('should change subject in state if new subject is clicked', async () => {
        const component = mount(study);
        await component.find('#open-eye').simulate('click');
        component.update();
        await component.find('#close-eye').simulate('click');
        component.update();
        jest.advanceTimersByTime(1000);
        let wrapper = component.find('#change-subject-button')
        wrapper.simulate('click');
        wrapper = component.find('#start-study-botton');
        expect(wrapper.getDOMNode()).toHaveProperty('disabled');
        wrapper = component.find('input').at(0);
        wrapper.simulate('click');
        let newstudyinstance = component.find(Study.WrappedComponent).instance();
        expect(newstudyinstance.state.subject).toBe('test1');
        expect(wrapper.getDOMNode()).toHaveProperty('checked', true);
        wrapper.simulate('click');
        expect(newstudyinstance.state.subject).toBe('test1');
        component.unmount();
    });
    it('should restart study when new subject is clicked', async () => {
        const mockaction = (subject) => {
            return {type: actionTypes.CHANGE_SUBJECT, subject: subject}
        };
        const spychangesubject = jest.spyOn(actionStudy, 'changeSubject')
            .mockImplementation(() => {
                return dispatch => {
                    dispatch(mockaction('test1'))
                };
            });
        const component = mount(study);
        await component.find('#open-eye').simulate('click');
        component.update();
        await component.find('#close-eye').simulate('click');
        component.update();
        jest.advanceTimersByTime(1000);
        let wrapper = component.find('#change-subject-button')
        wrapper.simulate('click');
        wrapper = component.find('input').at(0);
        wrapper.simulate('click');
        let newstudyinstance = component.find(Study.WrappedComponent).instance();
        expect(newstudyinstance.state.subject).toBe('test1');
        wrapper = component.find('#start-study-botton');
        wrapper.simulate('click');
        component.update();
        expect(spychangesubject).toBeCalledTimes(1);
        expect(newstudyinstance.state.subjectShow).toBe(false);
        component.unmount();
    });
    it('should restart study only when new subject is clicked', async () => {
        const spychangesubject = jest.spyOn(actionStudy, 'changeSubject')
            .mockImplementation(() => {
                return dispatch => {
                };
            });
        const component = mount(study);
        await component.find('#open-eye').simulate('click');
        component.update();
        await component.find('#close-eye').simulate('click');
        component.update();
        jest.advanceTimersByTime(1000);
        let wrapper = component.find('#change-subject-button')
        wrapper.simulate('click');
        wrapper = component.find('input').at(0);
        wrapper.simulate('click');
        let newstudyinstance = component.find(Study.WrappedComponent).instance();
        wrapper = component.find('#start-study-botton');
        wrapper.simulate('click');
        expect(spychangesubject).toBeCalledTimes(0);
        expect(newstudyinstance.state.subjectShow).toBe(false);
        expect(newstudyinstance.state.time.seconds()).toBe(1);
        component.unmount();
    });
    it('should call endstudy and redirected to mainpage', async () => {
        const spyendstudy = jest.spyOn(actionStudy, 'endStudy')
            .mockImplementation(() => {
                return dispatch => {
                };
            });
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(study);
        await component.find('#open-eye').simulate('click');
        component.update();
        await component.find('#close-eye').simulate('click');
        component.update();

        jest.advanceTimersByTime(1000);
        let wrapper = component.find('#end-study-button')
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/');
        component.unmount();
    });
    it('should call endstudy and component is unmounted', () => {
        const spyendstudy = jest.spyOn(actionStudy, 'endStudy')
            .mockImplementation(() => {
                return dispatch => {
                };
            });
        const component = mount(study);
        component.unmount();
        expect(spyendstudy).toBeCalledTimes(1);
    });
});