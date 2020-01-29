import { call, put, takeLatest } from 'redux-saga/effects';

import { signUp, ActionType } from 'signUp/action';
import { signUpFactory } from 'service/backend-django-rest-errdepo/api';

function* runSignUp(
  handler: typeof signUpFactory,
  action: ReturnType<typeof signUp.start>
) {
  const {
    inputUserName,
    inputEmail,
    inputPassword1,
    inputPassword2
  } = action.payload;

  try {
    const api = handler();
    yield call(api, inputUserName, inputEmail, inputPassword1, inputPassword2);
    yield put(signUp.succeed());
  } catch (error) {
    yield put(signUp.fail(error.message));
  }
}

export function* watchSignUp(handler: typeof signUpFactory) {
  yield takeLatest(ActionType.SIGN_UP_START, runSignUp, handler);
}
