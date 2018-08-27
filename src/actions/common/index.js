import * as socket from './socket';
import * as dispatchActions from './dispatch';

module.exports = {
  ...socket,
  ...dispatchActions,
};
