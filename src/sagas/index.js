import { all } from 'redux-saga/effects';
import tasks from './tasks';
import posts from './posts';

function* rootSaga () {
  yield all([
      tasks(),
      posts(),
  ]);    
}

export default rootSaga;