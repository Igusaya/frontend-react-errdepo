import { Reducer } from 'redux';

import { ActionType, viewReportListAction } from 'actions/reportList';
import { ReportList } from 'service/backend-django-rest-errdepo/model';

export interface State {
  reportList: ReportList;
  error?: string | null;
  err?: boolean | null;
}

export const initialState: State = {
  reportList: {
    count: 0,
    next: null,
    previous: null,
    results: []
  }
};

export type Action = viewReportListAction;

/* Reducer
 ***********************************************/
const reducer: Reducer<State, viewReportListAction> = (
  state: State = initialState,
  action: viewReportListAction
): State => {
  switch (action.type) {
    case ActionType.GET_REPORTS_START:
      return {
        ...state
      };
    case ActionType.GET_REPORTS_SUCCEED:
      return {
        ...state,
        reportList: action.payload.result
      };
    case ActionType.GET_REPORTS_FAIL:
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
