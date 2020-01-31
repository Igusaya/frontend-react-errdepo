import { Report } from 'service/backend-django-rest-errdepo/model';

/* Constants
 ***********************************************/
export enum ActionType {
  GET_LANG_START = 'GET_LANG_START',
  GET_LANG_SUCCEED = 'GET_LANG_SUCCEED',
  GET_LANG_FAIL = 'GET_LANG_FAIL',
  GET_FW_START = 'GET_FW_START',
  GET_FW_SUCCEED = 'GET_FW_SUCCEED',
  GET_FW_FAIL = 'GET_FW_FAIL',
  GET_CONFIRM_REPORT_START = 'GET_CONFIRM_REPORT_START',
  GET_CONFIRM_REPORT_SUCCEED = 'GET_CONFIRM_REPORT_SUCCEED',
  GET_CONFIRM_REPORT_FAIL = 'GET_CONFIRM_REPORT_FAIL',
  POST_REPORT_START = 'POST_REPORT_START',
  POST_REPORT_SUCCEED = 'POST_REPORT_SUCCEED',
  POST_REPORT_FAIL = 'POST_REPORT_FAIL',
  BACK_TO_CREATE_REPORT = 'BACK_TO_CREATE_REPORT'
}

/* Interface
 ***********************************************/
export interface GetConfirmParam {
  lang: string;
  fw: string;
  env: string;
  errmsg: string;
  description: string;
  correspondence: string;
}
export type PostReportPram = GetConfirmParam;

export interface GetConfirmResult {
  description: string;
  correspondence: string;
}

/* Action
 ***********************************************/
export const getLang = {
  start: () => ({
    type: ActionType.GET_LANG_START as typeof ActionType.GET_LANG_START
  }),

  succeed: (result: string[]) => ({
    type: ActionType.GET_LANG_SUCCEED as typeof ActionType.GET_LANG_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.GET_LANG_FAIL as typeof ActionType.GET_LANG_FAIL,
    payload: { error },
    err: true
  })
};

export const getFw = {
  start: (param: string) => ({
    type: ActionType.GET_FW_START as typeof ActionType.GET_FW_START,
    payload: { param }
  }),

  succeed: (result: string[]) => ({
    type: ActionType.GET_FW_SUCCEED as typeof ActionType.GET_FW_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.GET_FW_FAIL as typeof ActionType.GET_FW_FAIL,
    payload: { error },
    err: true
  })
};

export const getConfirmReport = {
  start: (param: GetConfirmParam) => ({
    type: ActionType.GET_CONFIRM_REPORT_START as typeof ActionType.GET_CONFIRM_REPORT_START,
    payload: { param }
  }),

  succeed: (result: GetConfirmResult) => ({
    type: ActionType.GET_CONFIRM_REPORT_SUCCEED as typeof ActionType.GET_CONFIRM_REPORT_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.GET_CONFIRM_REPORT_FAIL as typeof ActionType.GET_CONFIRM_REPORT_FAIL,
    payload: { error },
    err: true
  })
};

export const postReport = {
  start: (param: PostReportPram) => ({
    type: ActionType.POST_REPORT_START as typeof ActionType.POST_REPORT_START,
    payload: { param }
  }),

  succeed: (result: Report) => ({
    type: ActionType.POST_REPORT_SUCCEED as typeof ActionType.POST_REPORT_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.POST_REPORT_FAIL as typeof ActionType.POST_REPORT_FAIL,
    payload: { error },
    err: true
  })
};

export const backToReport = {
  action: () => ({
    type: ActionType.BACK_TO_CREATE_REPORT as typeof ActionType.BACK_TO_CREATE_REPORT,
    viewConfirm: false
  })
};

export type makeReportAction =
  | ReturnType<typeof getLang.start>
  | ReturnType<typeof getLang.succeed>
  | ReturnType<typeof getLang.fail>
  | ReturnType<typeof getFw.start>
  | ReturnType<typeof getFw.succeed>
  | ReturnType<typeof getFw.fail>
  | ReturnType<typeof getConfirmReport.start>
  | ReturnType<typeof getConfirmReport.succeed>
  | ReturnType<typeof getConfirmReport.fail>
  | ReturnType<typeof postReport.start>
  | ReturnType<typeof postReport.succeed>
  | ReturnType<typeof postReport.fail>
  | ReturnType<typeof backToReport.action>;