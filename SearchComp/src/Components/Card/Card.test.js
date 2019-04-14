import React from 'react';
import Enzyme,{shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './Card'
import ShallowRenderer from 'react-test-renderer/shallow'

Enzyme.configure({adapter:new Adapter()});

test('Card renders properly',()=>{
    const wrapper=shallow(<Card></Card>);
    expect(wrapper.length).toBe(1);
})

test('Checking Card Snapshot',()=>{
let renderer=new ShallowRenderer();
let instance=renderer.render(<Card/>)
expect(instance).toMatchSnapshot();
})