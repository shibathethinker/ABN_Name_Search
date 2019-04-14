import React from 'react';
import Enzyme,{shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBoxWrapper from './SearchBoxWrapper';
import {Provider} from 'react-redux';
import rootReducer from '../../Reducer/';
import { compose,createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import FullRenderer from 'react-test-renderer';

Enzyme.configure({adapter:new Adapter()});

function isValidSearch(val)
{
    console.log(val)
}
function dummyFunction(val)
{}

function getSearchBoxWrapperInstance()
{
    const middlewares = [thunkMiddleware];
    const wrapper=mount(
        <Provider  store={createStore(rootReducer,{},compose(applyMiddleware(thunkMiddleware)))}>
            <SearchBoxWrapper              
            setParentState={dummyFunction} 
            setSearchText={dummyFunction} 
            isValidSearch={isValidSearch}>        
                </SearchBoxWrapper>
                </Provider>)
                return wrapper;
}

test('Search Wrapper rendered correctly',()=>{
    const wrapper=shallow(<SearchBoxWrapper></SearchBoxWrapper>)
    expect(wrapper.length).toBe(1);
})

test('SearchBox snapshot',()=>{
    let instance=FullRenderer.create(getSearchBoxWrapperInstance());
    expect(instance).toMatchSnapshot();
})

// test('search box wrapper input validation ',()=>{   
//     const errorMsgABN='Invalid ABN';
// const wrapper=getSearchBoxWrapperInstance();
// const inputBox=wrapper.find('#inputText');
// inputBox.simulate('change',{target:{value:'74172177893'}})
// inputBox.simulate('blur')

// wrapper.update();
// console.log(wrapper.html());
// const errorMsg=wrapper.find('#inputError');

// expect(errorMsg.text().toString()).toEqual(errorMsgABN);
// })



