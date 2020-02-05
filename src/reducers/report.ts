import { Reducer } from 'redux';

import { ActionType, reportAction } from 'actions/report';
import { FwSet } from 'service/backend-django-rest-errdepo/model';

export interface ReportState {
  id?: number;
  created?: string;
  modify?: string;
  lang?: string;
  fw?: string;
  env?: string;
  errmsg?: string;
  description?: string;
  correspondence?: string;
  descriptionHTML?: string;
  correspondenceHTML?: string;
  owner_id?: number;
  owner?: string;
}

export interface State {
  reportId?: number;
  report?: ReportState;
  lang?: string[];
  fw?: FwSet[];
  error?: string | null;
  err?: boolean | null;
  isFwLoading: boolean;
}

export const initialState: State = {
  isFwLoading: false
};

export type Action = reportAction;

/* Reducer
 ***********************************************/
const reportReducer: Reducer<State, reportAction> = (
  state: State = initialState,
  action: reportAction
): State => {
  switch (action.type) {
    /* Select report detail
     ***********************************************/
    case ActionType.SELECT_REPORT_DETAIL:
      return {
        ...state,
        reportId: action.id
      };
    /* Get report detail
     ***********************************************/
    case ActionType.GET_REPORT_DETAIL_START:
      return {
        ...state,
        reportId: action.payload.id
      };
    case ActionType.GET_REPORT_DETAIL_SUCCEED:
      return {
        ...state,
        report: action.payload.result
      };
    case ActionType.GET_REPORT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err
      };
    /* Get lang
     ***********************************************/
    case ActionType.GET_LANG_START:
      return {
        ...state
      };
    case ActionType.GET_LANG_SUCCEED:
      return {
        ...state,
        lang: action.payload.result
      };
    case ActionType.GET_LANG_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err
      };
    /* Get fw
     ***********************************************/
    case ActionType.GET_FW_START:
      return {
        ...state,
        isFwLoading: true
      };
    case ActionType.GET_FW_SUCCEED:
      return {
        ...state,
        fw: action.payload.result,
        isFwLoading: false
      };
    case ActionType.GET_FW_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err,
        isFwLoading: false
      };
    /* Get confirm report
     ***********************************************/
    case ActionType.GET_CONFIRM_REPORT_START:
      return {
        ...state,
        report: {
          lang: action.payload.param.lang,
          fw: action.payload.param.fw,
          env: action.payload.param.env,
          errmsg: action.payload.param.errmsg,
          description: action.payload.param.description,
          correspondence: action.payload.param.correspondence
        }
      };
    case ActionType.GET_CONFIRM_REPORT_SUCCEED:
      return {
        ...state,
        report: {
          ...state.report,
          descriptionHTML: action.payload.result.descriptionHTML,
          correspondenceHTML: action.payload.result.correspondenceHTML
        }
      };
    case ActionType.GET_CONFIRM_REPORT_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err
      };
    /* Post report
     ***********************************************/
    case ActionType.POST_REPORT_START:
      return {
        ...state
      };
    case ActionType.POST_REPORT_SUCCEED:
      return {
        ...state,
        report: action.payload.result
      };
    case ActionType.POST_REPORT_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err
      };
    /* Post report
     ***********************************************/
    case ActionType.PUT_REPORT_START:
      return {
        ...state,
        report: action.payload.param
      };
    case ActionType.PUT_REPORT_SUCCEED:
      return {
        ...state,
        report: action.payload.result
      };
    case ActionType.PUT_REPORT_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err
      };
    /* Delete report
     ***********************************************/
    case ActionType.DELETE_REPORT_START:
      return {
        ...state
      };
    case ActionType.DELETE_REPORT_SUCCEED:
      return {
        ...state,
        reportId: undefined,
        report: undefined
      };
    case ActionType.DELETE_REPORT_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err
      };
    default:
      return state;
  }
};

export default reportReducer;
