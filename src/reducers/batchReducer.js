import immutable from 'immutable';
import { BATCHED_ACTIONS, INIT_STATE } from '../constants/batched.js';

/**
 * 组合连续更新的states
 *
 * @export
 * @param {*} rootReducer
 * @returns
 */
export default function batchReducer(rootReducer){
  return (state, action) => {
    if(action.type === BATCHED_ACTIONS){
      const nextState = action.payload.reduce(rootReducer, state);
      return nextState;
    }
    if(action.type === INIT_STATE){
      return immutable.fromJS({});
    }
    return rootReducer(state, action);
  };
}