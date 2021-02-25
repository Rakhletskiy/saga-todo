import { put, call, takeLatest } from 'redux-saga/effects'

const fetchPostsFromApi = () => fetch('https://jsonplaceholder.typicode.com/users/1/posts').then(r => r.json())
function* fetchPosts(action) {
  try {
      const posts = yield call(fetchPostsFromApi);
      yield put({ type: "POSTS_FETCH_SUCCEED", payload: posts });
    } catch (e) {
    console.error(e.message)
  }
}


function* postsSaga() {
  yield takeLatest("FETCH_POSTS", fetchPosts);
}

export default postsSaga;