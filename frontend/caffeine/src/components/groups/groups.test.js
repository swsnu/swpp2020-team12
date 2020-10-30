import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Groups from './groups';
import * as actionCreators from '../../store/actions/groups';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

const stubInitialState = {
  myGroupList: [
    { id: 1, name: 'test', description: null, time: 'P0DT10H42M00S', members: 2 },
    { id: 2, name: 'test2', description: null, time: 'P0DT10H41M00S', members: 1 }
  ],
  searchGroupList: [{ id: 3, name: 'abcd', description: null, time: 'P0DT10H41M00S', members: 1 }],
};

const mockStore = getMockStore(stubInitialState);

describe('<Groups />', () => {
  let groups, spygetGroups;

  beforeEach(() => {
    groups = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={Groups} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spygetGroups = jest.spyOn(actionCreators, 'getGroups')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render Groups', () => {
    const component = mount(groups);
    const wrapper = component.find('.name');
    expect(wrapper.length).toBe(2);
    expect(spygetGroups).toBeCalledTimes(1);
  });
  it(`should call 'clickGroupHandler'`, () => {
    const spygetGroups = jest.spyOn(actionCreators, 'getGroup')
      .mockImplementation(id => {return dispatch => {}; });
    const component = mount(groups);
    const wrapper = component.find('.name').at(0);
    wrapper.simulate('click');
    expect(spygetGroups).toHaveBeenCalledTimes(1);
    const newInstance = component.find(Groups.WrappedComponent).instance();
    expect(newInstance.state.isDeatilopend).toEqual(true);
  });
  it(`should call 'searchHandler'`, () => {
    const spysearchGroups = jest.spyOn(actionCreators, 'SearchGroups')
      .mockImplementation(id => {return dispatch => {}; });
    const component = mount(groups);
    const wrapper = component.find('#group-search-button');
    wrapper.simulate('click');
    expect(spysearchGroups).toHaveBeenCalledTimes(1);
  });
  it(`should change 'isaddopen' `, () => {
    const component = mount(groups);
    const wrapper = component.find('#create-group-button');
    wrapper.simulate('click');
    const newInstance = component.find(Groups.WrappedComponent).instance();
    expect(newInstance.state.isAddopend).toEqual(true);
  });
  it(`should call 'clickSearchedGroupHandelr'`, () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(groups);
    const wrapper = component.find('li');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/groups/3');
  });
  it(`should change 'searchinput'`, () => {
    const component = mount(groups);
    const wrapper = component.find('#group-search-input');
    wrapper.simulate('change', { target: { value: '1234'} });
    const newInstance = component.find(Groups.WrappedComponent).instance();
    expect(newInstance.state.group_name).toEqual('1234');
  });
});