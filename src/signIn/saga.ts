import { call, put, takeLatest } from 'redux-saga/effects';

import { signIn, ActionType } from 'signIn/action';
import { signInFactory } from 'signIn/service/api';

function* runSignUp(action: ReturnType<typeof signIn.start>) {
  const { inputUserName, inputPassword } = action.payload;

  try {
    const api = signInFactory();
    yield call(api, inputUserName, inputPassword);
    yield put(signIn.succeed());
  } catch (error) {
    yield put(signIn.fail(error.message));
  }
}

export function* watchSignIn() {
  yield takeLatest(ActionType.SIGN_IN_START, runSignUp);
}
