import { Reducer } from 'redux';

import { ActionType, viewReportAction } from 'viewReport/action';
import { Report } from 'service/backend-django-rest-errdepo/model';

export interface State {
  reportDetail?: Report;
  reportId?: number;
  error?: string | null;
  err?: boolean | null;
}

export const initialState: State = {};

export type Action = viewReportAction;

/* Reducer
 ***********************************************/
const reducer: Reducer<State, viewReportAction> = (
  state: State = initialState,
  action: viewReportAction
): State => {
  switch (action.type) {
    case ActionType.SELECT_REPORT_DETAIL:
      return {
        ...state
      };
    case ActionType.GET_REPORT_DETAIL_START:
      return {
        ...state,
        reportId: action.payload.id
      };
    case ActionType.GET_REPORT_DETAIL_SUCCEED:
      return {
        ...state,
        reportDetail: action.payload.result
      };
    case ActionType.GET_REPORT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err
      };
    default:
      return state;
  }
};

export default reducer;
