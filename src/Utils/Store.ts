import { createStore, applyMiddleware } from 'redux';
import { reducers } from '../Reducers/index';

let state = {};
const store = createStore(reducers, state, applyMiddleware());

export default store;
