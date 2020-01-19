import { call, put, takeLatest } from 'redux-saga/effects';

import { signUp, ActionType } from 'signUp/action';
import { signUpFactory } from 'service/backend-django-rest-todolists/api';

function* runSignUp(action: ReturnType<typeof signUp.start>) {
  const {
    inputUserName,
    inputEmail,
    inputPassword1,
    inputPassword2
  } = action.payload;

  try {
    const api = signUpFactory();
    yield call(api, inputUserName, inputEmail, inputPassword1, inputPassword2);
    yield put(signUp.succeed());
  } catch (error) {
    yield put(signUp.fail(error.message));
  }
}

export function* watchSignUp() {
  yield takeLatest(ActionType.SIGN_UP_START, runSignUp);
}
