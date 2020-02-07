import {
  ReportList,
  FwSet,
  ExistsValueSet
} from 'service/backend-django-rest-errdepo/model';

/* Constants
 ***********************************************/
export enum ActionType {
  GET_REPORTS_START = 'GET_REPORTS_START',
  GET_REPORTS_SUCCEED = 'GET_REPORTS_SUCCEED',
  GET_REPORTS_FAIL = 'GET_REPORTS_FAIL',
  GET_MORE_REPORTS_START = 'GET_MORE_REPORTS_START',
  GET_MORE_REPORTS_SUCCEED = 'GET_MORE_REPORTS_SUCCEED',
  GET_MORE_REPORTS_FAIL = 'GET_MORE_REPORTS_FAIL',
  SEARCH_REPORTS_START = 'SEARCH_REPORTS_START',
  SEARCH_REPORTS_SUCCEED = 'SEARCH_REPORTS_SUCCEED',
  SEARCH_REPORTS_FAIL = 'SEARCH_REPORTS_FAIL',
  GET_EXISTS_VALUES_START = 'GET_EXISTS_VALUES_START',
  GET_EXISTS_VALUES_SUCCEED = 'GET_EXISTS_VALUES_SUCCEED',
  GET_EXISTS_VALUES_FAIL = 'GET_EXISTS_VALUES_FAIL',
  GET_FW_LIST_START = 'GET_FW_LIST_START',
  GET_FW_LIST_SUCCEED = 'GET_FW_LIST_SUCCEED',
  GET_FW_LIST_FAIL = 'GET_FW_LIST_FAIL'
}
/* Interface
 ***********************************************/
export interface SearchParam {
  inputWord?: string[];
  inputLang?: string[];
  inputFw?: string[];
  inputCreater?: string[];
}

/* Action
 ***********************************************/
export const getReportList = {
  start: () => ({
    type: ActionType.GET_REPORTS_START as typeof ActionType.GET_REPORTS_START
  }),

  succeed: (result: ReportList) => ({
    type: ActionType.GET_REPORTS_SUCCEED as typeof ActionType.GET_REPORTS_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.GET_REPORTS_FAIL as typeof ActionType.GET_REPORTS_FAIL,
    payload: { error },
    err: true
  })
};

export const getMoreReports = {
  start: (url: string) => ({
    type: ActionType.GET_MORE_REPORTS_START as typeof ActionType.GET_MORE_REPORTS_START,
    payload: { url }
  }),

  succeed: (result: ReportList) => ({
    type: ActionType.GET_MORE_REPORTS_SUCCEED as typeof ActionType.GET_MORE_REPORTS_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.GET_MORE_REPORTS_FAIL as typeof ActionType.GET_MORE_REPORTS_FAIL,
    payload: { error },
    err: true
  })
};

export const searchReports = {
  start: (param: SearchParam) => ({
    type: ActionType.SEARCH_REPORTS_START as typeof ActionType.SEARCH_REPORTS_START,
    payload: { param }
  }),

  succeed: (result: ReportList) => ({
    type: ActionType.SEARCH_REPORTS_SUCCEED as typeof ActionType.SEARCH_REPORTS_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.SEARCH_REPORTS_FAIL as typeof ActionType.SEARCH_REPORTS_FAIL,
    payload: { error },
    err: true
  })
};

export const getFwList = {
  start: (param: string) => ({
    type: ActionType.GET_FW_LIST_START as typeof ActionType.GET_FW_LIST_START,
    payload: { param }
  }),

  succeed: (result: FwSet[]) => ({
    type: ActionType.GET_FW_LIST_SUCCEED as typeof ActionType.GET_FW_LIST_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.GET_FW_LIST_FAIL as typeof ActionType.GET_FW_LIST_FAIL,
    payload: { error },
    err: true
  })
};

export const getExistsValues = {
  start: () => ({
    type: ActionType.GET_EXISTS_VALUES_START as typeof ActionType.GET_EXISTS_VALUES_START
  }),

  succeed: (result: ExistsValueSet[]) => ({
    type: ActionType.GET_EXISTS_VALUES_SUCCEED as typeof ActionType.GET_EXISTS_VALUES_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.GET_EXISTS_VALUES_FAIL as typeof ActionType.GET_EXISTS_VALUES_FAIL,
    payload: { error },
    err: true
  })
};
export type viewReportListAction =
  | ReturnType<typeof getReportList.start>
  | ReturnType<typeof getReportList.succeed>
  | ReturnType<typeof getReportList.fail>
  | ReturnType<typeof getMoreReports.start>
  | ReturnType<typeof getMoreReports.succeed>
  | ReturnType<typeof getMoreReports.fail>
  | ReturnType<typeof searchReports.start>
  | ReturnType<typeof searchReports.succeed>
  | ReturnType<typeof searchReports.fail>
  | ReturnType<typeof getFwList.start>
  | ReturnType<typeof getFwList.succeed>
  | ReturnType<typeof getFwList.fail>
  | ReturnType<typeof getExistsValues.start>
  | ReturnType<typeof getExistsValues.succeed>
  | ReturnType<typeof getExistsValues.fail>;
