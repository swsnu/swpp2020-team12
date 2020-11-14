import React from 'react';
import { shallow } from 'enzyme';
import SelectSubject from './selectSubject';

const props={
    mySubjectList: [
        {id: 1, name: 'swpp'}
    ],
    subject: null
}
describe('<SelectSubject />', () => {
    it('should render without errors', () => {
        const component = shallow(<SelectSubject mySubjectList={props.mySubjectList} subject={null} />);
        const wrapper = component.find('Modal');
        expect(wrapper.length).toBe(1);
    });
    it('should call onClickCheck', () => {
        const spyonclick=jest.fn()
        const component = shallow(<SelectSubject show={true} mySubjectList={props.mySubjectList} subject={null}
            onClickCheck={spyonclick} />);
        const wrapper = component.find('input');
        wrapper.simulate('click')
        expect(spyonclick).toBeCalledTimes(1);
    });
    it('should call onClickChoose', () => {
        const spyonclick=jest.fn()
        const component = shallow(<SelectSubject show={true} mySubjectList={props.mySubjectList} subject={null}
            onClickChoose={spyonclick} />);
        const wrapper = component.find('Button');
        wrapper.simulate('click')
        expect(spyonclick).toBeCalledTimes(1);
    });
  });
