import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getLang,
  ActionType,
  getConfirmReport,
  postReport,
  getReportDetail,
  putReport,
  getFwList,
  deleteReport
} from 'actions/report';
import {
  getLangFactory,
  getConfirmFactory,
  postReportFactory,
  getReportDetailFactory,
  putReportFactory,
  getFwListFactory,
  deleteReportFactory
} from 'service/backend-django-rest-errdepo/api';

/* Run function
 ***********************************************/
function* runGetLang(
  handler: typeof getLangFactory,
  action: ReturnType<typeof getLang.start>
) {
  try {
    const api = handler();
    const langArray = yield call(api);
    yield put(getLang.succeed(langArray));
  } catch (error) {
    yield put(getLang.fail(error.message));
  }
}

function* runGetConfirm(
  handler: typeof getConfirmFactory,
  action: ReturnType<typeof getConfirmReport.start>
) {
  try {
    const api = handler();
    const confirmColumn = yield call(
      api,
      action.payload.param.description,
      action.payload.param.correspondence,
      action.payload.param.lang
    );
    yield put(
      getConfirmReport.succeed({
        descriptionHTML: confirmColumn.descriptionHTML,
        correspondenceHTML: confirmColumn.correspondenceHTML
      })
    );
  } catch (error) {
    yield put(getConfirmReport.fail(error.message));
  }
}

function* runPostReport(
  handler: typeof postReportFactory,
  action: ReturnType<typeof postReport.start>
) {
  try {
    const api = handler();
    const report = yield call(
      api,
      action.payload.param.lang,
      action.payload.param.fw,
      action.payload.param.env,
      action.payload.param.errmsg,
      action.payload.param.description,
      action.payload.param.correspondence,
      action.payload.param.descriptionHTML,
      action.payload.param.correspondenceHTML
    );
    yield put(postReport.succeed(report));
  } catch (error) {
    yield put(postReport.fail(error.message));
  }
}

function* runGetReportDetail(
  handler: typeof getReportDetailFactory,
  action: ReturnType<typeof getReportDetail.start>
) {
  try {
    const api = handler();
    const report = yield call(api, action.payload.id);
    yield put(getReportDetail.succeed(report));
  } catch (error) {
    yield put(getReportDetail.fail(error.message));
  }
}

function* runPutReport(
  handler: typeof putReportFactory,
  action: ReturnType<typeof putReport.start>
) {
  try {
    const api = handler();
    const report = yield call(api, action.payload.param);
    yield put(putReport.succeed(report));
  } catch (error) {
    yield put(putReport.fail(error.message));
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

function* runDeleteReport(
  handler: typeof deleteReportFactory,
  action: ReturnType<typeof deleteReport.start>
) {
  try {
    const api = handler();
    yield call(api, action.payload.id);
    yield put(deleteReport.succeed(action.payload.id));
  } catch (error) {
    yield put(deleteReport.fail(error.message));
  }
}

/* Watch function
 ***********************************************/
export function* watchGetLang(handler: typeof getLangFactory) {
  yield takeLatest(ActionType.GET_LANG_START, runGetLang, handler);
}

export function* watchGetConfirm(handler: typeof getConfirmFactory) {
  yield takeLatest(ActionType.GET_CONFIRM_REPORT_START, runGetConfirm, handler);
}

export function* watchPostReport(handler: typeof postReportFactory) {
  yield takeLatest(ActionType.POST_REPORT_START, runPostReport, handler);
}

export function* watchGetReportDetail(handler: typeof getReportDetailFactory) {
  yield takeLatest(
    ActionType.GET_REPORT_DETAIL_START,
    runGetReportDetail,
    handler
  );
}

export function* watchPutReport(handler: typeof putReportFactory) {
  yield takeLatest(ActionType.PUT_REPORT_START, runPutReport, handler);
}

export function* watchGetFwList(handler: typeof getFwListFactory) {
  yield takeLatest(ActionType.GET_FW_START, runGetFwList, handler);
}

export function* watchDeleteReport(handler: typeof deleteReportFactory) {
  yield takeLatest(ActionType.DELETE_REPORT_START, runDeleteReport, handler);
}
