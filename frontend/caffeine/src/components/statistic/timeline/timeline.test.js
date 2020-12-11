/* eslint react/prop-types: 0 */
import React from 'react';
import {shallow} from 'enzyme';
import TimeLine from './timeline'

describe('<TimeLine />', () => {
    it('should render without errors', () => {
        const spyHandle = jest.fn()
        const component = shallow(<TimeLine show={true} handletimelineShow={spyHandle} timelineData={{'title':'swpp','cardSubtitle':'01:02:03~04:05:06'}}/>);
        const wrapper = component.find('Modal');
        expect(wrapper.length).toBe(1);
    });
    it('should button', () => {
        const spyHandle = jest.fn()
        const component = shallow(<TimeLine show={true} handletimelineShow={spyHandle} timelineData={{'title':'swpp','cardSubtitle':'01:02:03~04:05:06'}}/>);
        const wrapper = component.find('Button');
        wrapper.simulate('click')
        expect(spyHandle).toBeCalledTimes(1)
    })
})

