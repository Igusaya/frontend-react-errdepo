import { call, put, takeLatest } from 'redux-saga/effects';

import { signOut, ActionType, getProfile, putProfile } from 'actions/userMenu';
import {
  signOutFactory,
  getProfileFactory,
  putProfileFactory
} from 'service/backend-django-rest-errdepo/api';
import { PutProfile } from 'service/backend-django-rest-errdepo/model';

function* runSignOut(
  handler: typeof signOutFactory,
  action: ReturnType<typeof signOut.start>
) {
  try {
    const api = handler();
    yield call(api);
    yield put(signOut.succeed());
  } catch (error) {
    yield put(signOut.fail(error.message));
  }
}

function* runGetProfile(
  handler: typeof getProfileFactory,
  action: ReturnType<typeof getProfile.start>
) {
  try {
    const api = handler();
    const profile = yield call(api);
    yield put(getProfile.succeed(profile));
  } catch (error) {
    yield put(getProfile.fail(error.message));
  }
}

function* runPutProfile(
  handler: typeof putProfileFactory,
  action: ReturnType<typeof putProfile.start>
) {
  try {
    const putProfileParam: PutProfile = {
      id: action.payload.param.profile.id,
      description: action.payload.param.profile.description,
      image: action.payload.param.profile.image
    };
    const api = handler();
    const profile = yield call(api, putProfileParam);
    yield put(putProfile.succeed(profile));
  } catch (error) {
    yield put(putProfile.fail(error.message));
  }
}

export function* watchSignOut(handler: typeof signOutFactory) {
  yield takeLatest(ActionType.SIGN_OUT_START, runSignOut, handler);
}

export function* watchGetProfile(handler: typeof getProfileFactory) {
  yield takeLatest(ActionType.GET_PROFILE_START, runGetProfile, handler);
}

export function* watchPutProfile(handler: typeof putProfileFactory) {
  yield takeLatest(ActionType.PUT_PROFILE_START, runPutProfile, handler);
}
