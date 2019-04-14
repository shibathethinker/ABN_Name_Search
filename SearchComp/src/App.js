import React, { Component } from 'react';
import {Provider} from 'react-redux';
import Grid from '../src/Components/Grid/Grid';
import rootReducer from './Reducer';
import './App.css';
import { compose,createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

class App extends Component {
  componentDidCatch(error, info) {
   }

  render() {
    const middlewares = [thunkMiddleware,  logger];

    return (
      <Provider  store={createStore(rootReducer,{},compose(
        applyMiddleware(logger,thunkMiddleware)))}>
      <div className="App">
            <Grid></Grid>
      </div>
      </Provider>
    );
  }
}

export default App;
