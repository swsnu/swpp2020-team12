import React from 'react';
import { shallow } from 'enzyme';
import Subject from './subject';

describe('<Subject />', () => {
  it('should render without errors', () => {
    const component = shallow(<Subject />);
    const wrapper = component.find('.Subject');
    expect(wrapper.length).toBe(1);
  });
});
