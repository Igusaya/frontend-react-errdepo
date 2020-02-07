import { Reducer } from 'redux';

import { ActionType, viewReportListAction } from 'actions/reportList';
import { ReportList, FwSet } from 'service/backend-django-rest-errdepo/model';

export interface State {
  reportList: ReportList;
  error?: string | null;
  err?: boolean | null;
  isLoading: boolean;
  isShowingSearchResults: boolean;
  langList: string[];
  createrList: string[];
  fwList: FwSet[];
}

export const initialState: State = {
  reportList: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  isLoading: false,
  isShowingSearchResults: false,
  langList: [],
  createrList: [],
  fwList: []
};

export type Action = viewReportListAction;

/* Reducer
 ***********************************************/
const reducer: Reducer<State, viewReportListAction> = (
  state: State = initialState,
  action: viewReportListAction
): State => {
  switch (action.type) {
    /* Get reports
     ***********************************************/
    case ActionType.GET_REPORTS_START:
      return {
        ...state
      };
    case ActionType.GET_REPORTS_SUCCEED:
      return {
        ...state,
        reportList: action.payload.result,
        isShowingSearchResults: false
      };
    case ActionType.GET_REPORTS_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err
      };
    /* Get more reports
     ***********************************************/
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
    /* Search reports
     ***********************************************/
    case ActionType.SEARCH_REPORTS_START:
      return {
        ...state,
        reportList: {
          count: 0,
          next: null,
          previous: null,
          results: []
        }
      };
    case ActionType.SEARCH_REPORTS_SUCCEED:
      return {
        ...state,
        reportList: action.payload.result,
        isShowingSearchResults: true
      };
    case ActionType.SEARCH_REPORTS_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err
      };
    /* Get fw list
     ***********************************************/
    case ActionType.GET_FW_LIST_START:
      return {
        ...state
      };
    case ActionType.GET_FW_LIST_SUCCEED:
      return {
        ...state,
        fwList: state.fwList.concat(action.payload.result)
      };
    case ActionType.GET_FW_LIST_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err
      };
    /* Get exists valuse
     ***********************************************/
    case ActionType.GET_EXISTS_VALUES_START:
      return {
        ...state
      };
    case ActionType.GET_EXISTS_VALUES_SUCCEED:
      return {
        ...state,
        langList: action.payload.result.map(val => val.lang),
        createrList: action.payload.result.map(val => val.creater)
      };
    case ActionType.GET_EXISTS_VALUES_FAIL:
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
