import { call, put, takeLatest } from 'redux-saga/effects';

import { getReports, ActionType } from 'actions/reportList';
import { getReportFactory } from 'service/backend-django-rest-errdepo/api';

function* runGetReports(
  handler: typeof getReportFactory,
  action: ReturnType<typeof getReports.start>
) {
  try {
    const api = handler();
    const reports = yield call(api);
    yield put(getReports.succeed(reports));
  } catch (error) {
    yield put(getReports.fail(error));
  }
}

export function* watchGetReports(handler: typeof getReportFactory) {
  yield takeLatest(ActionType.GET_REPORTS_START, runGetReports, handler);
}
