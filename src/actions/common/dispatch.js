import store from '../../store/index.js';
import { bindActionCreators } from 'redux';

const dispatch = store.dispatch;
export const dispatchAction = (type) => (payload) => dispatch({ type, payload });
export const dispatchThunk = (thunk) => bindActionCreators(thunk, dispatch);
