import { call, put, takeLatest } from 'redux-saga/effects';

import { signOut, ActionType, getProfile, putProfile } from 'user/action';
import {
  signOutFactory,
  getProfileFactory,
  putProfileFactory
} from 'service/backend-django-rest-todolists/api';
import { PutProfile } from 'service/backend-django-rest-todolists/model';

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

function* runPutProfile(action: ReturnType<typeof putProfile.start>) {
  try {
    const putProfileParam: PutProfile = {
      id: action.payload.param.profile.id,
      description: action.payload.param.profile.description,
      image: action.payload.param.profile.image
    };
    const api = putProfileFactory();
    const profile = yield call(api, putProfileParam);
    yield put(putProfile.succeed(profile));
  } catch (error) {
    yield put(putProfile.fail(error.message));
  }
}

export function* watchSignOut() {
  yield takeLatest(ActionType.SIGN_OUT_START, runSignOut);
}

export function* watchGetProfile() {
  yield takeLatest(ActionType.GET_PROFILE_START, runGetProfile);
}

export function* watchPutProfile() {
  yield takeLatest(ActionType.PUT_PROFILE_START, runPutProfile);
}
