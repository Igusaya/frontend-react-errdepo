import { call, put, takeLatest } from 'redux-saga/effects';

import { getReportList, ActionType } from 'actions/reportList';
import { getReportListFactory } from 'service/backend-django-rest-errdepo/api';

function* runGetReportList(
  handler: typeof getReportListFactory,
  action: ReturnType<typeof getReportList.start>
) {
  try {
    const api = handler();
    const reports = yield call(api);
    yield put(getReportList.succeed(reports));
  } catch (error) {
    yield put(getReportList.fail(error.message));
  }
}

export function* watchGetReportList(handler: typeof getReportListFactory) {
  yield takeLatest(ActionType.GET_REPORTS_START, runGetReportList, handler);
}
