import { Report } from 'service/backend-django-rest-errdepo/model';

/* Constants
 ***********************************************/
export enum ActionType {
  GET_REPORTS_START = 'GET_REPORTS_START',
  GET_REPORTS_SUCCEED = 'GET_REPORTS_SUCCEED',
  GET_REPORTS_FAIL = 'GET_REPORTS_FAIL',
  GET_REPORT_DETAIL_START = 'GET_REPORT_DETAIL_START',
  GET_REPORT_DETAIL_SUCCEED = 'GET_REPORT_DETAIL_SUCCEED',
  GET_REPORT_DETAIL_FAIL = 'GET_REPORT_DETAIL_FAIL'
}
/* Interface
 ***********************************************/

/* Action
 ***********************************************/
export const getReports = {
  start: () => ({
    type: ActionType.GET_REPORTS_START as typeof ActionType.GET_REPORTS_START
  }),

  succeed: (result: Report[]) => ({
    type: ActionType.GET_REPORTS_SUCCEED as typeof ActionType.GET_REPORTS_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.GET_REPORTS_FAIL as typeof ActionType.GET_REPORTS_FAIL,
    payload: { error },
    err: true
  })
};

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

export type viewReportAction =
  | ReturnType<typeof getReports.start>
  | ReturnType<typeof getReports.succeed>
  | ReturnType<typeof getReports.fail>
  | ReturnType<typeof getReportDetail.start>
  | ReturnType<typeof getReportDetail.succeed>
  | ReturnType<typeof getReportDetail.fail>;
