/* eslint-disable no-unused-vars */
import React from 'react';
import {shallow} from 'enzyme';
import SelectGroup from './selectGroup';

const props = {
    myGroupList: [
        {id: 1, name: 'group1', active_count: 1}
    ],
    group: null
}
describe('<SelectGroup />', () => {
    it('should render without errors', () => {
        const component = shallow(<SelectGroup myGroupList={props.myGroupList} group={null}/>);
        const wrapper = component.find('Modal');
        expect(wrapper.length).toBe(1);
    });
    it('should call onClickCheck', () => {
        const spyClick = jest.fn()
        const component = shallow(<SelectGroup show={true} myGroupList={props.myGroupList} group={null}
                                                 onClickCheck={spyClick}/>);
        const wrapper = component.find('input');
        wrapper.simulate('click')
        expect(spyClick).toBeCalledTimes(1);
    });
    it('should call onClickChoose', () => {
        const spyClick = jest.fn()
        const component = shallow(<SelectGroup show={true} myGroupList={props.myGroupList} group={null}
                                                 onClickChoose={spyClick}/>);
        const wrapper = component.find('Button');
        wrapper.simulate('click')
        expect(spyClick).toBeCalledTimes(1);
    });
});
