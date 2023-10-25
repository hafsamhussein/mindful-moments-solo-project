import { put, takeLatest } from 'redux-saga/effects';

function* fetchMoments() {
  try {
    const response = yield fetch('/api/moments');  
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const moments = yield response.json();  
    yield put({ type: 'SET_MOMENTS', payload: moments });
  } catch (error) {
    console.log('Moments get request failed', error);
  }
}

function* momentsSaga() {
  yield takeLatest('FETCH_MOMENTS', fetchMoments);
}

export default momentsSaga;
