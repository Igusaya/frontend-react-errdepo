import { Report, ReportList } from 'service/backend-django-rest-errdepo/model';

/* Constants
 ***********************************************/
export enum ActionType {
  GET_REPORTS_START = 'GET_REPORTS_START',
  GET_REPORTS_SUCCEED = 'GET_REPORTS_SUCCEED',
  GET_REPORTS_FAIL = 'GET_REPORTS_FAIL'
}
/* Interface
 ***********************************************/

/* Action
 ***********************************************/
export const getReports = {
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

export type viewReportListAction =
  | ReturnType<typeof getReports.start>
  | ReturnType<typeof getReports.succeed>
  | ReturnType<typeof getReports.fail>;
