import { call, put, takeLatest } from 'redux-saga/effects';

import { user, ActionType } from 'user/action';
import { signOutFactory } from 'user/service/signOutApi';

function* runSignOut(action: ReturnType<typeof user.start>) {
  try {
    const api = signOutFactory();
    yield call(api);
    yield put(user.succeed());
  } catch (error) {
    yield put(user.fail(error.message));
  }
}

export function* watchSignOut() {
  yield takeLatest(ActionType.SIGN_OUT_START, runSignOut);
}
