import { all, fork } from 'redux-saga/effects';

import { watchSignUp } from 'sagas/signUp';
import { watchSignIn } from 'sagas/signIn';
import { watchSignOut, watchGetProfile, watchPutProfile } from 'sagas/userMenu';
import {
  watchGetLang,
  watchGetConfirm,
  watchPostReport,
  watchGetReportDetail,
  watchPutReport,
  watchGetFwList
} from 'sagas/report';
import { watchGetReportList, watchGetMoreReports } from 'sagas/reportList';
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
    fork(watchGetReportList, api.getReportListFactory),
    fork(watchGetReportDetail, api.getReportDetailFactory),
    fork(watchPutReport, api.putReportFactory),
    fork(watchGetFwList, api.getFwListFactory),
    fork(watchGetMoreReports, api.getMoreReportsFactory)
  ]);
}
