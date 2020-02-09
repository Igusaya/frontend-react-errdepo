import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getReportList,
  ActionType,
  getMoreReports,
  getExistsValues,
  getFwList,
  searchReports
} from 'actions/reportList';
import {
  getReportListFactory,
  getMoreReportsFactory,
  getExistsValuesFactory,
  getFwListFactory,
  getSearchRportsFactory
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

function* runGetExistsValues(
  handler: typeof getExistsValuesFactory,
  action: ReturnType<typeof getExistsValues.start>
) {
  try {
    const api = handler();
    const existsValueSet = yield call(api);
    yield put(getExistsValues.succeed(existsValueSet));
  } catch (error) {
    yield put(getExistsValues.fail(error.message));
  }
}

function* runGetFwList(
  handler: typeof getFwListFactory,
  action: ReturnType<typeof getFwList.start>
) {
  try {
    const api = handler();
    const fwList = yield call(api, action.payload.param);
    yield put(getFwList.succeed(fwList));
  } catch (error) {
    yield put(getFwList.fail(error.message));
  }
}

function* runGetSearchReports(
  handler: typeof getSearchRportsFactory,
  action: ReturnType<typeof searchReports.start>
) {
  try {
    const api = handler();
    const reports = yield call(api, action.payload.param);
    yield put(searchReports.succeed(reports));
  } catch (error) {
    yield put(searchReports.fail(error.message));
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

export function* watchGetExistsValues(handler: typeof getExistsValuesFactory) {
  yield takeLatest(
    ActionType.GET_EXISTS_VALUES_START,
    runGetExistsValues,
    handler
  );
}

export function* watchGetFwList(handler: typeof getFwListFactory) {
  yield takeLatest(ActionType.GET_FW_LIST_START, runGetFwList, handler);
}

export function* watchGetSearchReports(handler: typeof getSearchRportsFactory) {
  yield takeLatest(
    ActionType.SEARCH_REPORTS_START,
    runGetSearchReports,
    handler
  );
}
