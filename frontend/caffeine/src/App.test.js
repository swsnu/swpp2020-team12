import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
  it('should render', () => {
    const component = shallow(<App/>);
    expect(component.find('.App').length).toBe(1);
  });
});
