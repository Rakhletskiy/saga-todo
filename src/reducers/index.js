import { combineReducers } from 'redux';
import tasksReducer from './tasks';
import postsReducer from './posts';

export default combineReducers({
  tasks: tasksReducer,
  music: postsReducer,
});