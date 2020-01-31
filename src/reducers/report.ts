import { Reducer } from 'redux';

import { ActionType, makeReportAction } from 'actions/report';

export interface State {
  report?: {
    id?: number;
    created?: string;
    modify?: string;
    lang?: string;
    fw?: string;
    env?: string;
    errmsg?: string;
    description?: string;
    correspondence?: string;
    owner_id?: number;
    owner?: string;
  };
  viewConfirm: boolean;
  lang?: string[];
  error?: string | null;
  err?: boolean | null;
}

export const initialState: State = {
  viewConfirm: false
};

export type Action = makeReportAction;

/* Reducer
 ***********************************************/
const reportReducer: Reducer<State, makeReportAction> = (
  state: State = initialState,
  action: makeReportAction
): State => {
  switch (action.type) {
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
        viewConfirm: true,
        report: {
          ...state.report,
          description: action.payload.result.description,
          correspondence: action.payload.result.correspondence
        }
      };
    case ActionType.GET_CONFIRM_REPORT_FAIL:
      return {
        ...state,
        error: action.payload.error,
        err: action.err
      };
    case ActionType.BACK_TO_CREATE_REPORT:
      return {
        ...state,
        viewConfirm: action.viewConfirm
      };
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
    default:
      return state;
  }
};

export default reportReducer;