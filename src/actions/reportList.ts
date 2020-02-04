import { ReportList } from 'service/backend-django-rest-errdepo/model';

/* Constants
 ***********************************************/
export enum ActionType {
  GET_REPORTS_START = 'GET_REPORTS_START',
  GET_REPORTS_SUCCEED = 'GET_REPORTS_SUCCEED',
  GET_REPORTS_FAIL = 'GET_REPORTS_FAIL',
  GET_MORE_REPORTS_START = 'GET_MORE_REPORTS_START',
  GET_MORE_REPORTS_SUCCEED = 'GET_MORE_REPORTS_SUCCEED',
  GET_MORE_REPORTS_FAIL = 'GET_MORE_REPORTS_FAIL'
}
/* Interface
 ***********************************************/

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

export type viewReportListAction =
  | ReturnType<typeof getReportList.start>
  | ReturnType<typeof getReportList.succeed>
  | ReturnType<typeof getReportList.fail>
  | ReturnType<typeof getMoreReports.start>
  | ReturnType<typeof getMoreReports.succeed>
  | ReturnType<typeof getMoreReports.fail>;
