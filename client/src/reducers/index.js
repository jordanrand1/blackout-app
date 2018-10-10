import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import codapi from './codapi';

const rootReducer = combineReducers({
  user,
  flash,
  codapi,
});

export default rootReducer;

