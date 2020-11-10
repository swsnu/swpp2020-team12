import React from 'react';
import { shallow } from 'enzyme';
import Group from './group';

describe('<Group />', () => {
  it('should render without errors', () => {
    const component = shallow(<Group />);
    const wrapper = component.find('#Group');
    expect(wrapper.length).toBe(1);
  });
});
