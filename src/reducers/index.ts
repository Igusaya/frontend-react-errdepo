import { Reducer, combineReducers } from 'redux';

import report, {
  State as ReportState,
  Action as ReportAction,
  initialState as reportInitialState
} from 'reducers/report';
import reportList, {
  State as ReportListState,
  initialState as reportListInitialState
} from 'reducers/reportList';
import user, {
  State as UserState,
  Action as UserAction,
  initialState as userInitialState
} from 'reducers/user';

type Action = UserAction | ReportAction;

export interface State {
  user: UserState;
  report: ReportState;
  reportList: ReportListState;
}

const initialState: State = {
  user: userInitialState,
  report: reportInitialState,
  reportList: reportListInitialState
};

/**
 * 子要素のstate間で値の受け渡しを行う
 * @param state
 * @param action
 */
const crossSliceReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
): State => {
  return state;
};

const rootReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
): State => {
  const intermediateReducer = combineReducers<State>({
    // ここで設定するreducerはstateと名前が一致しないとエラーになる
    user,
    report,
    reportList
  });
  // combinReducerで取りまとめられたstateを取得
  const intermediateState = intermediateReducer(state, action);
  // 自作のcrossSlicerReducerで子要素間のstateを受け渡し
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
};

export default rootReducer;
