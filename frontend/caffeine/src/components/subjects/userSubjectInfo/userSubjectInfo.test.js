import {shallow} from 'enzyme';
import UserSubjectInfo from './userSubjectInfo';
import React from 'react';


describe('<UserSubjectInfo/>', () => {
    let component;
//    const onChangeName = jest.fn();
    const onClickEdit = jest.fn();
    const onClickQuit = jest.fn();
    const handleDetailShow = jest.fn();
    const onChangeDescription = jest.fn();
    const onChangeDay = jest.fn();
    const onChangeStartTime = jest.fn();
    const onChangeEndTime = jest.fn();
    beforeEach(() => {
        component = shallow(<UserSubjectInfo
            name=''
            description=''
            start_time='00:00'
            end_time='00:00'
            day={0}
            show={true}
            onClickEdit={onClickEdit}
            onClickQuit={onClickQuit}
            handleDetailShow={handleDetailShow}
            onChangeDescription={onChangeDescription}
            onChangeDay={onChangeDay}
            onChangeStartTime={onChangeStartTime}
            onChangeEndTime={onChangeEndTime}
        />);
    });

    it('should change description', () => {
        const test = 'TEST'
        const wrapper = component.find('#edit-subject-description-input');
        wrapper.simulate('change', {target: {value: test}});
        expect(onChangeDescription).toBeCalledTimes(1);
    })
    it('should change day', () => {
        const test = 0
        const wrapper = component.find('#day-select');
        wrapper.simulate('change', {target: {value: test}});
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