import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Subjects from './subjects';
import * as actionCreators from '../../store/actions/subjects';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

const stubInitialState = {
  mySubjectList: [
    { id: 1, name: 'subject1', description: 'ds', days:[{day: 0, start_time: '10:00', end_time: '12:00'}] },
    { id: 2, name: 'subject2', description: '', days:[{day: 0, start_time: '10:00', end_time: '12:00'}] }
  ],
  specificSubjectInfo: { id: 1, name: 'subject1', description: 'ds', days:[{day: 0, start_time: '10:00', end_time: '12:00'}] },
};

const mockStore = getMockStore(stubInitialState);
/*
describe('<Subjects />', () => {
  let subjects, spyGetSubjects;

  beforeEach(() => {
    subjects = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={Subjects} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetSubjects = jest.spyOn(actionCreators, 'getSubjects')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render Subjects', () => {
    const component = mount(subjects);
    const wrapper = component.find('.name');
    expect(wrapper.length).toBe(2);
    expect(spyGetSubjects).toBeCalledTimes(1);
  });
  /*
  it(`should call 'clickSubjectHandler'`, () => {
    const spygetSubjects = jest.spyOn(actionCreators, 'getSubject')
      .mockImplementation(id => {return dispatch => {}; });
    const component = mount(subjects);
    const wrapper = component.find('.name').at(0);
    wrapper.simulate('click');
    expect(spygetSubjects).toHaveBeenCalledTimes(1);
    const newInstance = component.find(Subjects.WrappedComponent).instance();
    expect(newInstance.state.isDeatilopend).toEqual(true);
  });
  it(`should call 'searchHandler'`, () => {
    const spysearchSubjects = jest.spyOn(actionCreators, 'SearchSubjects')
      .mockImplementation(id => {return dispatch => {}; });
    const component = mount(subjects);
    const wrapper = component.find('#subject-search-button');
    wrapper.simulate('click');
    expect(spysearchSubjects).toHaveBeenCalledTimes(1);
  });
  it(`should change 'isaddopen' `, () => {
    const component = mount(subjects);
    const wrapper = component.find('#create-subject-button');
    wrapper.simulate('click');
    const newInstance = component.find(Subjects.WrappedComponent).instance();
    expect(newInstance.state.isAddopend).toEqual(true);
  });
  it(`should call 'clickSearchedSubjectHandelr'`, () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(subjects);
    const wrapper = component.find('li');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/subjects/3');
  });
  it(`should change 'searchinput'`, () => {
    const component = mount(subjects);
    const wrapper = component.find('#subject-search-input');
    wrapper.simulate('change', { target: { value: '1234'} });
    const newInstance = component.find(Subjects.WrappedComponent).instance();
    expect(newInstance.state.subject_name).toEqual('1234');
  });

})


 */