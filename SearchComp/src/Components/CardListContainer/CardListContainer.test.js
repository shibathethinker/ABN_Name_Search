import React from 'react';
import Enzyme,{shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedContainer,{CardListContainer} from './CardListContainer';
import ShallowRenderer  from 'react-test-renderer/shallow'

import configureStore  from 'redux-mock-store';


Enzyme.configure({ adapter: new Adapter() });


let dummyData ={searchResult:[{"Abn":"86386400414","AbnStatus":"0000000001","IsCurrent":true,
"Name":"SIBASHIS NANDA","NameType":"Entity Name","Postcode":"2077","Score":87,
"State":"NSW"},{"Abn":"79075856895","AbnStatus":"0000000002","IsCurrent":true,
"Name":"SIBASHIS PARIDA","NameType":"Entity Name","Postcode":"3073","Score":87,"State":"VIC"}]};


test('CardListContainer renders correctly',()=>{
    const wrapper=shallow(<CardListContainer searchResult={dummyData}></CardListContainer>);
    expect(wrapper.length).toBe(1);
})


test('Checking snapshot',()=>{
    const renderer = new ShallowRenderer();
    const renderedValue=renderer.render(<CardListContainer  searchResult={dummyData}/>);
    //const renderedValue =  ShallowRenderer.createRenderer(<CardListContainer/>).toJSON()
    expect(renderedValue).toMatchSnapshot();
})
/*describe('test with data',()=>{
    const initialState={searchResult:dummyData}
    const middlewares = []
    const mockStore = configureStore(middlewares)    
    let store,container;
 
    beforeEach(()=>{
        store = mockStore(initialState)
        const actionData=()=>{return {type:"text_change",payload:dummyData}}
        store.dispatch(actionData())
        container = mount(<ConnectedContainer /> )  
    });

    it('Card List Container renders children!!!',()=>{console.log(container.debug())})

})*/

