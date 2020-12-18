/* eslint-disable no-unused-vars */
import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import Subjects from './subjects';
import * as actionCreators from '../../store/actions/subjects';
import {getMockStore} from '../../test-utils/mocks';
import {history} from '../../store/store';


jest.setTimeout(10000)

jest.mock('./subject/subject', () => {
    return jest.fn(props => {
        return (
            <div className="spySubject">
                <div className="name"
                     onClick={props.clickDetail}>
                    <h3>{props.name}</h3>
                </div>
            </div>
        );
    });
});


jest.mock('./createSubject/createSubject', () => {
    return jest.fn(props => {
        return (
            <div className='spyCreate'>
                <input id='create-subject-name-input' type='text' value={props.name}
                       onChange={(event) => props.onChangeName(event)}/>
                <input id='create-subject-description-input' type='text' value={props.description}
                       onChange={(event) => props.onChangeDescription(event)}/>
                <select id="day-select" value={props.day}
                        onChange={(event) => props.onChangeDay(event)}>
                    <option value={0}>Sun</option>
                    <option value={1}>Mon</option>
                </select>
                <div>
                    <input type='time' id='start-time' value={props.start_time}
                           onChange={(event) => props.onChangeStartTime(event)}/>
                </div>
                <div>
                    <input type='time' id='end-time' value={props.end_time}
                           onChange={(event) => props.onChangeEndTime(event)}/>
                </div>
                <button id="back-new-subject-button"
                        onClick={props.handleCreateShow}/>
                <button id="confirm-new-subject-button"
                        onClick={props.onClickConfirm}/>
                <button id="handle-create-button"
                        onClick={props.handleCreateShow}>handle
                </button>
            </div>);
    });
});


jest.mock('./userSubjectInfo/userSubjectInfo', () => {
    return jest.fn(props => {
        return (
            <div className='spyInfo'>
                <input id='edit-subject-description-input' type="Description"
                       onChange={(event) => props.onChangeDescription(event)}/>
                <div className="form-group">
                    <select id="day-select"
                            onChange={(event) => props.onChangeDay(event)}>
                        <option value={0}>Sun</option>
                    </select>
                </div>
                <div>
                    <input type='time' id='start-time' min='09:00' max='20:00'
                           onChange={(event) => props.onChangeStartTime(event)}/>
                </div>
                <div>
                    <input type='time' id='end-time' min='09:00' max='22:00'
                           onChange={(event) => props.onChangeEndTime(event)}/>
                </div>
                <button id="quit-subject-button"
                        onClick={props.onClickQuit}>delete
                </button>
                <button id="edit-subject-button"
                        onClick={props.onClickEdit}>edit
                </button>
                <button id="handle-detail-button"
                        onClick={props.handleDetailShow}>handle
                </button>
            </div>
        )
    })
});

const stubInitialState = {
    mySubjectList: [
        {id: 1, name: 'subject1', description: 'ds', days: [{day: 0, start_time: '10:00', end_time: '12:00'}], user: 1},
        {id: 2, name: 'subject2', description: '', days: [{day: 0, start_time: '10:00', end_time: '12:00'}], user: 1}
    ],
    specificSubjectInfo: {
        id: 1,
        name: 'subject1',
        description: 'ds',
        days: [{day: 0, start_time: '10:00', end_time: '12:00'}],
        user: 1
    },
};

const mockStore = getMockStore(stubInitialState);

describe(' <Subjects/> ', () => {
    let subjects, spyGetSubjects;

    beforeEach(() => {
        subjects = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={Subjects}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>);
        spyGetSubjects = jest.spyOn(actionCreators, 'getSubjects')
            .mockImplementation(() => {
                return dispatch => {
                };
            });

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render Subjects', () => {
        const component = mount(subjects);
        const wrapper = component.find('.name');
        expect(wrapper.length).toBe(2);
        expect(spyGetSubjects).toBeCalledTimes(1);
    });

    it(`should call 'clickSubjectHandler'`, () => {
        const spyGetSubject = jest.spyOn(actionCreators, 'getSubject')
            .mockImplementation(id => {
                return dispatch => {
                };
            });
        const component = mount(subjects);
        const wrapper = component.find('.name').at(0);
        wrapper.simulate('click');
        expect(spyGetSubject).toHaveBeenCalledTimes(1);
        const newInstance = component.find(Subjects.WrappedComponent).instance();
        expect(newInstance.state.detailShow).toEqual(true);
    });
    it(`should change 'createShow' `, () => {
        const component = mount(subjects);
        const wrapper = component.find('#create-subject-button');
        wrapper.at(0).simulate('click');
        const newInstance = component.find(Subjects.WrappedComponent).instance();
        expect(newInstance.state.createShow).toEqual(true);
    });

    it(`should call 'component did update'`, () => {
        const component = mount(subjects);
        const prevProps = {
            specificSubjectInfo: null,
        }
        const prevInstance = component.find(Subjects.WrappedComponent).instance();
        prevInstance.componentDidUpdate(prevProps);
        expect(prevInstance.state.name).toEqual('subject1');
    });


    it('should render Subjects', () => {
        const component = mount(subjects);
        const wrapper = component.find('.name');
        expect(wrapper.length).toBe(2);
        expect(spyGetSubjects).toBeCalledTimes(1);
    });
    it(`should change alert error with empty input`, () => {
        const spyalert= jest.spyOn(window, 'alert').mockImplementation(() => {});
        const component = mount(subjects);
        const description = ''
        const wrapperDescription = component.find('#create-subject-description-input')
        wrapperDescription.simulate('change', {target: {value: description}});
        const wrapper = component.find("#confirm-new-subject-button");
        wrapper.simulate('click');
        expect(spyalert).toBeCalledTimes(1);
    });

    it(`should change create-description`, () => {
        const component = mount(subjects);
        const description = 'TEST_description'
        const wrapperDescription = component.find('#create-subject-description-input')
        wrapperDescription.simulate('change', {target: {value: description}});
        const newDescription = component.find(Subjects.WrappedComponent).instance();
        expect(newDescription.state.description).toEqual(description);
    });

    it(`should change create-days`, () => {
        const component = mount(subjects);

        const day = 1
        const wrapperDay = component.find('.spyCreate #day-select')
        wrapperDay.simulate('change', {target: {value: day}});

        const start_time = '13:00'
        const wrapperStartTime = component.find('.spyCreate #start-time')
        wrapperStartTime.simulate('change', {target: {value: start_time}});

        const end_time = '14:00'
        const wrapperEndTime = component.find('.spyCreate #end-time')
        wrapperEndTime.simulate('change', {target: {value: end_time}});
        const newDay = component.find(Subjects.WrappedComponent).instance();

        expect(newDay.state.start_time).toEqual(start_time);
        expect(newDay.state.day).toEqual(day);
        expect(newDay.state.end_time).toEqual(end_time);
    });

    it(`should call 'onClickConfirm'`, () => {
        const spyNewSubject = jest.spyOn(actionCreators, 'addSubject')
            .mockImplementation(sub => {
                return dispatch => {
                };
            });
        const component = mount(subjects);
        const name = 'TEST_NAME';
        const wrapperName = component.find('#create-subject-name-input');
        wrapperName.simulate('change', {target: {value: name}});
        const newName = component.find(Subjects.WrappedComponent).instance();
        expect(newName.state.name).toEqual(name);
        const wrapper = component.find("#confirm-new-subject-button");
        wrapper.simulate('click');
        expect(spyNewSubject).toHaveBeenCalledTimes(1)
    })



    it(`should call 'onClickEdit'`, () => {
        const spyEditSubject = jest.spyOn(actionCreators, 'editSubject')
            .mockImplementation(sub => {
                return dispatch => {
                };
            });
        const spyGetSubject = jest.spyOn(actionCreators, 'getSubject')
            .mockImplementation(id => {
                return dispatch => {
                };
            });
        const component = mount(subjects);
        const wrapper_get = component.find('.name').at(0);
        wrapper_get.simulate('click');

        const description = 'TEST_DESC';
        const wrapperDesc = component.find('#edit-subject-description-input');
        wrapperDesc.simulate('change', {target: {value: description}});
        const wrapper = component.find("#edit-subject-button");
        wrapper.simulate('click');
        expect(spyEditSubject).toHaveBeenCalledTimes(1)
    });
    it(`should call 'onClickDelete'`, () => {
        const spyEditSubject = jest.spyOn(actionCreators, 'deleteSubject')
            .mockImplementation(sub => {
                return dispatch => {
                };
            });
        const spyGetSubject = jest.spyOn(actionCreators, 'getSubject')
            .mockImplementation(id => {
                return dispatch => {
                };
            });
        const component = mount(subjects);
        const wrapper_get = component.find('.name').at(0);
        wrapper_get.simulate('click');

        const wrapper = component.find("#quit-subject-button");
        wrapper.simulate('click');
        expect(spyEditSubject).toHaveBeenCalledTimes(1)
    });
    it(`should handle 'handle detail show'`, () => {
        const component = mount(subjects);
        const wrapper_get = component.find('.name').at(0);
        wrapper_get.simulate('click');

        const wrapper = component.find("#handle-detail-button");
        wrapper.simulate('click');
        const newState = component.find(Subjects.WrappedComponent).instance();
        expect(newState.state.detailShow).toEqual(false);
    });
    it(`should handle 'handle create show'`, () => {
        const component = mount(subjects);
        const wrapper = component.find('#create-subject-button');
        wrapper.at(0).simulate('click');
        const newInstance = component.find(Subjects.WrappedComponent).instance();
        expect(newInstance.state.createShow).toEqual(true);

        const wrapper_handle = component.find("#handle-create-button");
        wrapper_handle.simulate('click');
        const newState = component.find(Subjects.WrappedComponent).instance();
        expect(newState.state.createShow).toEqual(false);
    });

});