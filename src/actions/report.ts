import { Report, FwSet } from 'service/backend-django-rest-errdepo/model';

/* Constants
 ***********************************************/
export enum ActionType {
  SELECT_REPORT_DETAIL = 'SELECT_REPORT_DETAIL',
  GET_REPORT_DETAIL_START = 'GET_REPORT_DETAIL_START',
  GET_REPORT_DETAIL_SUCCEED = 'GET_REPORT_DETAIL_SUCCEED',
  GET_REPORT_DETAIL_FAIL = 'GET_REPORT_DETAIL_FAIL',
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
  PUT_REPORT_START = 'PUT_REPORT_START',
  PUT_REPORT_SUCCEED = 'PUT_REPORT_SUCCEED',
  PUT_REPORT_FAIL = 'PUT_REPORT_FAIL'
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

export interface GetConfirmResult {
  descriptionHTML: string;
  correspondenceHTML: string;
}

export type PostReportPram = GetConfirmParam & GetConfirmResult;

export type PutReportPram = GetConfirmParam & GetConfirmResult & { id: number };

/* Action
 ***********************************************/
export const selectReportDetail = (id: number) => ({
  type: ActionType.SELECT_REPORT_DETAIL as typeof ActionType.SELECT_REPORT_DETAIL,
  id: id
});

export const getReportDetail = {
  start: (id: number) => ({
    type: ActionType.GET_REPORT_DETAIL_START as typeof ActionType.GET_REPORT_DETAIL_START,
    payload: { id }
  }),

  succeed: (result: Report) => ({
    type: ActionType.GET_REPORT_DETAIL_SUCCEED as typeof ActionType.GET_REPORT_DETAIL_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.GET_REPORT_DETAIL_FAIL as typeof ActionType.GET_REPORT_DETAIL_FAIL,
    payload: { error },
    err: true
  })
};

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

export const getFwList = {
  start: (param: string) => ({
    type: ActionType.GET_FW_START as typeof ActionType.GET_FW_START,
    payload: { param }
  }),

  succeed: (result: FwSet[]) => ({
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

export const putReport = {
  start: (param: PutReportPram) => ({
    type: ActionType.PUT_REPORT_START as typeof ActionType.PUT_REPORT_START,
    payload: { param }
  }),

  succeed: (result: Report) => ({
    type: ActionType.PUT_REPORT_SUCCEED as typeof ActionType.PUT_REPORT_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.PUT_REPORT_FAIL as typeof ActionType.PUT_REPORT_FAIL,
    payload: { error },
    err: true
  })
};

export type reportAction =
  | ReturnType<typeof getReportDetail.start>
  | ReturnType<typeof getReportDetail.succeed>
  | ReturnType<typeof getReportDetail.fail>
  | ReturnType<typeof selectReportDetail>
  | ReturnType<typeof getLang.start>
  | ReturnType<typeof getLang.succeed>
  | ReturnType<typeof getLang.fail>
  | ReturnType<typeof getFwList.start>
  | ReturnType<typeof getFwList.succeed>
  | ReturnType<typeof getFwList.fail>
  | ReturnType<typeof getConfirmReport.start>
  | ReturnType<typeof getConfirmReport.succeed>
  | ReturnType<typeof getConfirmReport.fail>
  | ReturnType<typeof postReport.start>
  | ReturnType<typeof postReport.succeed>
  | ReturnType<typeof postReport.fail>
  | ReturnType<typeof putReport.start>
  | ReturnType<typeof putReport.succeed>
  | ReturnType<typeof putReport.fail>;
