import React from 'react';
import { shallow } from 'enzyme';
import { Route, Redirect } from 'react-router';
import  PrivateRoute  from './PrivateRoute';

describe('<PrivateRoute/>', () => {

    it('passes props to Route component', () => {
        const { wrapper } = setup({ path: '/articles' });
        expect(wrapper.find(Route).prop('path')).toBe('/articles');
    });

    it('redirects unauthenticated users to login', () => {
        const { wrapper } = setup();
        const ComponentToRender = wrapper.prop('render');
        const redirectWrapper = shallow(<ComponentToRender location="/" />);
        expect(redirectWrapper.find(Redirect).props()).toEqual({
            to: {
                pathname: '/signin',
                state: { from: '/' }
            }
        });
    });

    it('dont redirect authenticated users', () => {
        const { wrapper, props } = setup({ isLoggedIn: true });
        const ComponentToRender = wrapper.prop('render');
        const componentWrapper = shallow(<ComponentToRender location="/" />);
        expect(componentWrapper.props()).toEqual({
            location: '/'
        });
    });
});

function setup(rest) {
    const props = {
        component: () => <h1>null</h1>,
        isLoggedIn: false,
        ...rest
    };

    const wrapper = shallow(<PrivateRoute {...props} />);

    return {
        wrapper,
        props
    }
}