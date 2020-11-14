import React from 'react';
import {shallow} from 'enzyme';
import StudyComp from './studycomp';

describe('<StudyComp />', () => {
    it('should render without errors', () => {
        const component = shallow(<StudyComp rate={0.9} name={'test'} state={'studying'}/>);
        let wrapper = component.find('.studycomp');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('#name');
        expect(wrapper.text()).toBe('test');
        wrapper = component.find('#state');
        expect(wrapper.text()).toBe('studying');
    });
    it('should render bar danger if rate is over 0.8', () => {
        const component = shallow(<StudyComp rate={0.9} name={'test'} state={'studying'}/>);
        const wrapper = component.find('ProgressBar');
        expect(wrapper.prop('variant')).toBe('danger');
    });
    it('should render bar warning if rate is between 0.6 and 0.8', () => {
        const component = shallow(<StudyComp rate={0.7} name={'test'} state={'studying'}/>);
        const wrapper = component.find('ProgressBar');
        expect(wrapper.prop('variant')).toBe('warning');
    });
    it('should info bar info if rate is less than 0.6', () => {
        const component = shallow(<StudyComp rate={0.5} name={'test'} state={'studying'}/>);
        const wrapper = component.find('ProgressBar');
        expect(wrapper.prop('variant')).toBe('info');
    });
});
  