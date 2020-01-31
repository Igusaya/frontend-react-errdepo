import { Report, ReportList } from 'service/backend-django-rest-errdepo/model';

/* Constants
 ***********************************************/
export enum ActionType {
  SELECT_REPORT_DETAIL = 'SELECT_REPORT_DETAIL',
  GET_REPORT_DETAIL_START = 'GET_REPORT_DETAIL_START',
  GET_REPORT_DETAIL_SUCCEED = 'GET_REPORT_DETAIL_SUCCEED',
  GET_REPORT_DETAIL_FAIL = 'GET_REPORT_DETAIL_FAIL'
}
/* Interface
 ***********************************************/

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

export type viewReportAction =
  | ReturnType<typeof getReportDetail.start>
  | ReturnType<typeof getReportDetail.succeed>
  | ReturnType<typeof getReportDetail.fail>
  | ReturnType<typeof selectReportDetail>;
