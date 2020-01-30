import { all, fork } from 'redux-saga/effects';

import { watchSignUp } from 'signUp/saga';
import { watchSignIn } from 'signIn/saga';
import { watchSignOut, watchGetProfile, watchPutProfile } from 'user/saga';
import {
  watchGetLang,
  watchGetConfirm,
  watchPostReport
} from 'postReport/saga';
import { watchGetReports } from 'viewReportList/saga';
import * as api from 'service/backend-django-rest-errdepo/api';

export default function* rootSaga() {
  yield all([
    fork(watchSignIn, api.signInFactory),
    fork(watchSignUp, api.signUpFactory),
    fork(watchSignOut, api.signOutFactory),
    fork(watchGetProfile, api.getProfileFactory),
    fork(watchPutProfile, api.putProfileFactory),
    fork(watchGetLang, api.getLangFactory),
    fork(watchGetConfirm, api.getConfirmFactory),
    fork(watchPostReport, api.postReportFactory),
    fork(watchGetReports, api.getReportFactory)
  ]);
}
