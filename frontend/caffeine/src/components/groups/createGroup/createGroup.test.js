import {shallow} from 'enzyme';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import CreateGroup from './createGroup';
import React from 'react';


describe('<CreateGroup/>', () => {
    let component;
    const onChangeName = jest.fn();
    const onClickConfirm = jest.fn();
    const handleCreateShow = jest.fn();
    const onChangeAnnounce = jest.fn();
    const onChangePassword = jest.fn();
    beforeEach(() => {
        component = shallow(<CreateGroup
            name=''
            description=''
            start_time='00:00'
            end_time='00:00'
            day={0}
            show={true}
            handleCreateShow={handleCreateShow}
            onClickConfirm={onClickConfirm}
            onChangeName={onChangeName}
            onChangeAnnounce={onChangeAnnounce}
            onChangePassword={onChangePassword}
        />);
    });

    it('should change name', () => {
        const name = 'TEST_NAME'
        const wrapper_name = component.find('#create-group-name-input');
        wrapper_name.simulate('change', {target: {value: name}});
        expect(onChangeName).toBeCalledTimes(1);
    })
    it('should change announcement', () => {
        const test = 'TEST'
        const wrapper = component.find('#create-group-announce-input');
        wrapper.simulate('change', {target: {value: test}});
        expect(onChangeAnnounce).toBeCalledTimes(1);
    })
    it('should change day', () => {
        const test = 'TEST'
        const wrapper = component.find('#create-group-password-input');
        wrapper.simulate('change', {target: {value: test}});
        expect(onChangePassword).toBeCalledTimes(1);
    })
})