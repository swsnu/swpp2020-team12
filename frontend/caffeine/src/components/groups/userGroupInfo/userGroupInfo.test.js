/* eslint-disable no-unused-vars */
import {shallow} from 'enzyme';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import UserGroupInfo from './userGroupInfo';
import React from 'react';


describe('<UserGroupInfo/>', () => {
    let component;
    const users= [
        {id: 1, name: 'test1', studyhour: 'P0DT10H42M00S', message: 'test1_msg'},
        {id: 2, name: 'test2', studyhour: 'P0DT10H41M00S', message: 'test2_msg'}
    ]
    const mockClickStudy=jest.fn();
    beforeEach(() => {
        component = shallow(<UserGroupInfo
            members={users}
            group_name='TEST_GROUP'
            show={true}
            activeCount={3}
            onClickStudy={mockClickStudy}
        />);
    });

    it('should render member name', () => {
        const wrapper_name = component.find('.name');
        expect(wrapper_name.length).toBe(2);
    });
    it('should render join study button', () => {
        const wrapper = component.find('#join-study-button');
        wrapper.simulate('click');
        expect(mockClickStudy).toHaveBeenCalledTimes(1)
    });
});