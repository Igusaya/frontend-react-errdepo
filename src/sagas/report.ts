import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getLang,
  ActionType,
  getConfirmReport,
  postReport
} from 'actions/report';
import {
  getLangFactory,
  getConfirmFactory,
  postReportFactory
} from 'service/backend-django-rest-errdepo/api';

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
        description: confirmColumn.description,
        correspondence: confirmColumn.correspondence
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
      action.payload.param.correspondence
    );
    yield put(postReport.succeed(report));
  } catch (error) {
    yield put(postReport.fail(error.message));
  }
}

export function* watchGetLang(handler: typeof getLangFactory) {
  yield takeLatest(ActionType.GET_LANG_START, runGetLang, handler);
}

export function* watchGetConfirm(handler: typeof getConfirmFactory) {
  yield takeLatest(ActionType.GET_CONFIRM_REPORT_START, runGetConfirm, handler);
}

export function* watchPostReport(handler: typeof postReportFactory) {
  yield takeLatest(ActionType.POST_REPORT_START, runPostReport, handler);
}
