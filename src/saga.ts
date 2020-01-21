import { all, fork } from 'redux-saga/effects';
import { watchSignUp } from 'signUp/saga';
import { watchSignIn } from 'signIn/saga';
import { watchSignOut, watchGetProfile, watchPutProfile } from 'user/saga';

export default function* rootSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchSignIn),
    fork(watchSignOut),
    fork(watchGetProfile),
    fork(watchPutProfile)
  ]);
}
