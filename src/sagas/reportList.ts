import { call, put, takeLatest } from 'redux-saga/effects';

import { getReportList, ActionType, getMoreReports } from 'actions/reportList';
import {
  getReportListFactory,
  getMoreReportsFactory
} from 'service/backend-django-rest-errdepo/api';

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

function* runGetMoreReports(
  handler: typeof getMoreReportsFactory,
  action: ReturnType<typeof getMoreReports.start>
) {
  try {
    const api = handler();
    const reports = yield call(api, action.payload.url);
    yield put(getMoreReports.succeed(reports));
  } catch (error) {
    yield put(getMoreReports.fail(error.message));
  }
}

export function* watchGetReportList(handler: typeof getReportListFactory) {
  yield takeLatest(ActionType.GET_REPORTS_START, runGetReportList, handler);
}

export function* watchGetMoreReports(handler: typeof getMoreReportsFactory) {
  yield takeLatest(
    ActionType.GET_MORE_REPORTS_START,
    runGetMoreReports,
    handler
  );
}
