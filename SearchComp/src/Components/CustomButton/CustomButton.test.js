import React from 'react';
import Enzyme,{shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomButton from './CustomButton';

Enzyme.configure({adapter:new Adapter()});

test('Button renders properly',()=>{
    const wrapper=shallow(<CustomButton></CustomButton>)
    expect(wrapper.length).toBe(1);
})

test('Button has proper CSS class',()=>{
const wrapper=shallow(<CustomButton></CustomButton>)
expect(wrapper.find('.customButton').length).toBe(1);
})

test('Button doe not have any text bu default',()=>{
const wrapper=shallow(<CustomButton></CustomButton>)
expect(wrapper.text().length).toBe(0);
})