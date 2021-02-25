import { put, takeLatest } from 'redux-saga/effects'

function* onAddTask(action) {
  yield put({type: "ADD_TASK_SUCCEED", payload: action.task})
}

function* onDelTask(action) {
  yield put({type: "DELETE_TASK_SUCCEED", payload: action.idx})
}

function* tasksSaga() {
  yield takeLatest("ADD_TASK", onAddTask);
  yield takeLatest("DELETE_TASK", onDelTask);
}

export default tasksSaga;