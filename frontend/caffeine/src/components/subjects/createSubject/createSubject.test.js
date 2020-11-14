import {shallow} from 'enzyme';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import CreateSubject from './createSubject';
import React from 'react';


describe('<CreateSubject/>', () => {
    /* it('renders CreateSubject', () => {
         const wrapper = shallow(<CreateSubject/>);
         expect(wrapper.find(Modal)).toHaveLength(1);
     });
     it('renders CreateSubject Modal', () => {
         const wrapper = shallow(<CreateSubject/>);
         expect(wrapper.find(Modal)).toHaveLength(1);
     });
     */
    let component;
    const onChangeName = jest.fn();
    const onClickConfirm = jest.fn();
    const handleCreateShow = jest.fn();
    const onChangeDescription = jest.fn();
    const onChangeDay = jest.fn();
    const onChangeStartTime = jest.fn();
    const onChangeEndTime = jest.fn();
    beforeEach(() => {
        component = shallow(<CreateSubject
            name=''
            description=''
            start_time='00:00'
            end_time='00:00'
            day={0}
            show={true}
            handleCreateShow={handleCreateShow}
            onClickConfirm={onClickConfirm}
            onChangeName={onChangeName}
            onChangeDescription={onChangeDescription}
            onChangeDay={onChangeDay}
            onChangeStartTime={onChangeStartTime}
            onChangeEndTime={onChangeEndTime}
        />);
    });

    it('should change name', () => {
        const name = 'TEST_NAME'
        const wrapper_name = component.find('#create-subject-name-input');
        wrapper_name.simulate('change', {target: {value: name}});
        expect(onChangeName).toBeCalledTimes(1);
    })
    it('should change description', () => {
        const test = 'TEST'
        const wrapper = component.find('#create-subject-description-input');
        wrapper.simulate('change', {target: {value: test}});
        expect(onChangeDescription).toBeCalledTimes(1);
    })
    it('should change day', () => {
        const test = 0
        const wrapper = component.find('#day-select');
        wrapper.simulate('change', {target: {value: 0}});
        expect(onChangeDay).toBeCalledTimes(1);
    })
    it('should change start time', () => {
        const test = '12:00'
        const wrapper = component.find('#start-time');
        wrapper.simulate('change', {target: {value: test}});
        expect(onChangeStartTime).toBeCalledTimes(1);
    })
    it('should change end time', () => {
        const test = '14:00'
        const wrapper = component.find('#end-time');
        wrapper.simulate('change', {target: {value: test}});
        expect(onChangeEndTime).toBeCalledTimes(1);
    })

})