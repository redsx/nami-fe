import { socketEmit } from '../common/index';

export const login = socketEmit('login');
export const signUp = socketEmit('signUp');