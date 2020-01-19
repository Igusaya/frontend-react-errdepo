import { call, put, takeLatest } from 'redux-saga/effects';

import { signOut, ActionType, getProfile } from 'user/action';
import {
  signOutFactory,
  getProfileFactory
} from 'service/backend-django-rest-todolists/api';

function* runSignOut(action: ReturnType<typeof signOut.start>) {
  try {
    const api = signOutFactory();
    yield call(api);
    yield put(signOut.succeed());
  } catch (error) {
    yield put(signOut.fail(error.message));
  }
}

function* runGetProfile(action: ReturnType<typeof getProfile.start>) {
  try {
    const api = getProfileFactory();
    const profile = yield call(api);
    yield put(getProfile.succeed(profile));
  } catch (error) {
    yield put(getProfile.fail(error.message));
  }
}

export function* watchSignOut() {
  yield takeLatest(ActionType.SIGN_OUT_START, runSignOut);
}

export function* watchGetProfile() {
  yield takeLatest(ActionType.GET_PROFILE_START, runGetProfile);
}
