import { Reducer } from 'redux';

import { ActionType, viewReportListAction } from 'actions/reportList';
import { ReportList } from 'service/backend-django-rest-errdepo/model';

export interface State {
  reportList: ReportList;
  error?: string | null;
  err?: boolean | null;
  isLoading: boolean;
}

export const initialState: State = {
  reportList: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  isLoading: false
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
    case ActionType.GET_MORE_REPORTS_START:
      return {
        ...state,
        isLoading: true
      };
    case ActionType.GET_MORE_REPORTS_SUCCEED:
      return {
        ...state,
        isLoading: false,
        reportList: {
          ...state.reportList,
          count: action.payload.result.count,
          next: action.payload.result.next,
          previous: action.payload.result.previous,
          results: state.reportList.results.concat(
            action.payload.result.results
          )
        }
      };
    case ActionType.GET_MORE_REPORTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        err: action.err
      };
    default:
      return state;
  }
};

export default reducer;
