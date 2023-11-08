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
// import { put, takeLatest, call } from 'redux-saga/effects';

// // Helper function to make fetch API call
// const fetchJson = (url, options = {}) =>
//   fetch(url, options).then((response) => {
//     if (!response.ok) throw new Error(response.statusText);
//     return response.json();
//   });

// function* fetchMoments() {
//   try {
//     const moments = yield call(fetchJson, '/api/moments');
//     yield put({ type: 'SET_MOMENTS', payload: moments });
//   } catch (error) {
//     console.log('Moments get request failed', error);
//   }
// }

// function* toggleFavorite(action) {
//   try {
//     // Replace this URL with the endpoint you'd use to toggle a favorite
//     const updatedMoment = yield call(fetchJson, `/api/moments/:id/favorite${action.payload}/toggle`, {
//       method: 'PUT',
//     });
//     // Dispatch an action to update a single moment with the updated data
//     yield put({ type: 'UPDATE_MOMENT', payload: updatedMoment });
//   } catch (error) {
//     console.log('Toggle favorite request failed', error);
//   }
// }

// function* momentsSaga() {
//   yield takeLatest('FETCH_MOMENTS', fetchMoments);
//   yield takeLatest('TOGGLE_FAVORITE_REQUEST', toggleFavorite);
// }

// export default momentsSaga;
