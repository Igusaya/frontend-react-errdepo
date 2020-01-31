import { call, put, takeLatest } from 'redux-saga/effects';

import { signIn, ActionType } from 'actions/signIn';
import { signInFactory } from 'service/backend-django-rest-errdepo/api';

function* runSignIn(
  handler: typeof signInFactory,
  action: ReturnType<typeof signIn.start>
) {
  const { inputUserName, inputPassword } = action.payload;

  try {
    const signInApi = handler();
    yield call(signInApi, inputUserName, inputPassword);
    yield put(signIn.succeed());
  } catch (error) {
    yield put(signIn.fail(error.message));
  }
}

export function* watchSignIn(handler: typeof signInFactory) {
  yield takeLatest(ActionType.SIGN_IN_START, runSignIn, handler);
}
