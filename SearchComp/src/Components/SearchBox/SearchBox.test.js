import SearchBox from './SearchBox';
import global from '../../../test/setupTests'
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'


test('searchbox renders',()=>{
const wrapper=global.shallow(<SearchBox></SearchBox>)
expect(wrapper.length).toBe(1);
})

test('searchbox input!',()=>{
const dummyFunction = jest.fn();
const wrapper=global.shallow(<SearchBox  onTextChangedFunc={dummyFunction}></SearchBox>)
const textBox=wrapper.find('#inputText')
textBox.simulate('change',{target:{value:'p123469988997'}})
console.log(textBox.debug());
expect(dummyFunction).toHaveBeenCalledWith({target:{value:'p123469988997'}});
})

test('seachbox snapshot',()=>{
let shallow=new ShallowRenderer();
let instance=shallow.render(<SearchBox/>)
expect(instance).toMatchSnapshot()
})


