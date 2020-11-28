/* eslint-disable no-unused-vars */
import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import Study from './study';
import thunk from 'redux-thunk';
import * as actionSubjects from '../../store/actions/subjects';
import * as actionStudy from '../../store/actions/study';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createBrowserHistory} from 'history';
import moment from 'moment'
import * as actionTypes from '../../store/actions/actionTypes'

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
};
const stubsubjectState = {
    mySubjectList: [
        {id: '1', name: 'test1'},
        {id: '2', name: 'test2'}
    ]
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
const mockStudyReducer = getMockStudyReducer(stubstudylState);
const mockSubjectReducer = getMockSubjectReducer(stubsubjectState);
const rootReducer = combineReducers({
    subject: mockSubjectReducer,
    study: mockStudyReducer,
});
const mockStore = createStore(rootReducer, applyMiddleware(thunk));


describe('<Study />', () => {
    let study, spygetSubjects;
    beforeEach(() => {
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
    })
    afterEach(() => {
        jest.clearAllMocks()
    });
    it('should render Study', () => {
        console.log = jest.fn();
        const component = mount(study);
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
    it('should render change time', () => {
        const component = mount(study);
        jest.advanceTimersByTime(1000);
        let newstudyinstance = component.find(Study.WrappedComponent).instance();
        expect(newstudyinstance.state.time.seconds()).toEqual(1);
        component.unmount();
    });
    it('should render take picuture at 10seconds and post it to server', () => {
        const spypost = jest.spyOn(actionStudy, 'postCapturetoServer')
            .mockImplementation(() => {
                return dispatch => {
                };
            });
        const component = mount(study);
        jest.advanceTimersByTime(12000);
        let newstudyinstance = component.find(Study.WrappedComponent).instance();
        expect(newstudyinstance.state.time.seconds()).toEqual(12);
        expect(spypost).toBeCalledTimes(1);
        component.unmount();
    });
    it('should change modal show satate when click button', () => {
        const component = mount(study);
        jest.advanceTimersByTime(1000);
        let wrapper = component.find('#change-subject-button')
        wrapper.simulate('click')
        let newstudyinstance = component.find(Study.WrappedComponent).instance();
        expect(newstudyinstance.state.subjectShow).toBe(true);
        wrapper = component.find('.spysubject');
        expect(wrapper.length).toBe(1);
        component.unmount();
    });
    it('should exit modal when click button', () => {
        const component = mount(study);
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
    it('should change subject in state if new subject is clicked', () => {
        const component = mount(study);
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
    it('should restart study when new subject is clicked', () => {
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
    it('should restart study only when new subject is clicked', () => {
        const spychangesubject = jest.spyOn(actionStudy, 'changeSubject')
            .mockImplementation(() => {
                return dispatch => {
                };
            });
        const component = mount(study);
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
    it('should call endstudy and redirected to mainpage', () => {
        const spyendstudy = jest.spyOn(actionStudy, 'endStudy')
            .mockImplementation(() => {
                return dispatch => {
                };
            });
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => {
            });
        const component = mount(study);
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