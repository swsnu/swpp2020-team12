/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import SignUp from './signUp';
import { getMockStore } from '../../../../src/test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/user';


const stubInitialState = {
    user: [
    { id: 1, username: 'test', password: "test1234", name:"testname", message:"hi"},
  ],
};

const mockStore = getMockStore(stubInitialState);

describe('<SignUp />', () => {
  let signup
  beforeEach(() => {
    signup = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={SignUp} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  
    it('should render without errors', () => {
      const component = mount(signup);
      expect(component.length).toBe(1);
    });
    
    it(`should call 'handlerCancle'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
        .mockImplementation(path => {});
        const component = mount(signup);
        const wrapper = component.find('#cancle-button');
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it(`should call 'handlerSignUp'`, () => {
        const handlerSignUp = jest.spyOn(actionCreators, 'signup')
        .mockImplementation(id => {return dispatch => {}; });
        const component = mount(signup);
        const wrapper = component.find('#sign-up-button');
        wrapper.simulate('click');
        expect(handlerSignUp).toHaveBeenCalledTimes(1);
    });
    
    
    it('should change username input', () => {
        const component = mount(signup);
        const wrapper = component.find('#username');
        wrapper.simulate('change', { target: { value: 'test'} });
        const newInstance = component.find(SignUp.WrappedComponent).instance();
        expect(newInstance.state.username).toEqual('test');
    });
    it('should change password input', () => {
        const component = mount(signup);
        const wrapper = component.find('#password');
        wrapper.simulate('change', { target: { value: 'test'} });
        const newInstance = component.find(SignUp.WrappedComponent).instance();
        expect(newInstance.state.password).toEqual('test');
    });
    it('should change name input', () => {
        const component = mount(signup);
        const wrapper = component.find('#name');
        wrapper.simulate('change', { target: { value: 'test'} });
        const newInstance = component.find(SignUp.WrappedComponent).instance();
        expect(newInstance.state.name).toEqual('test');
    });
    it('should change message input', () => {
        const component = mount(signup);
        const wrapper = component.find('#message');
        wrapper.simulate('change', { target: { value: 'test'} });
        const newInstance = component.find(SignUp.WrappedComponent).instance();
        expect(newInstance.state.message).toEqual('test');
    });


  });