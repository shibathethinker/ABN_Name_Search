import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Grid from './Grid';
import {Provider} from 'react-redux';
import rootReducer from '../../Reducer/';
import { compose,createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import ShallowRenderer from 'react-test-renderer/shallow';
import FullRenderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

function getWrapperInstance()
{
    const middlewares = [thunkMiddleware];
    const wrapper=mount(
        <Provider  store={createStore(rootReducer,{},compose(applyMiddleware(thunkMiddleware)))}>
            <Grid>   </Grid>
                </Provider>)
                return wrapper;
}

test('Grid Renders',()=>{    
const wrapper=shallow(<Grid></Grid>)
expect(wrapper.length).toBe(1);
})


test('Grid class renders',()=>{
const wrapper=getWrapperInstance()
expect(wrapper.find('.grid').length).toBe(1)
})


test('Grid renders two children',()=>{
const wrapper=getWrapperInstance()
expect(wrapper.find('.grid').children().length).toBe(2)
})

test('Check Grid snapshot',()=>{    
    const renderedValue=FullRenderer.create(getWrapperInstance());    
    expect(renderedValue).toMatchSnapshot();
})

