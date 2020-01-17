import { all, fork } from 'redux-saga/effects';
import { watchSignUp } from 'signUp/saga';
import { watchSignIn } from 'signIn/saga';

export default function* rootSaga() {
  yield all([fork(watchSignUp), fork(watchSignIn)]);
}
