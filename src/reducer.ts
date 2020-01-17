import { Reducer, combineReducers } from 'redux';

import signIn, {
  State as SignInState,
  Action as SignInAction,
  initialState as SignInInitialState
} from 'signIn/reducer';
import signUp, {
  State as SignUpState,
  Action as SignUpAction,
  initialState as SignUpInitialState
} from 'signUp/reducer';

type Action = SignInAction | SignUpAction;

export interface State {
  signIn: SignInState;
  signUp: SignUpState;
}

const initialState: State = {
  signIn: SignInInitialState,
  signUp: SignUpInitialState
};

/**
 * 子要素のstate間で値の受け渡しを行いたい場合はここで行う
 * @param state
 * @param action
 */
const crossSliceReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
): State => {
  // TODO: signIn.modalOpenとsignUp.modalOpenをsignOutで初期化する
  return state;
};

const rootReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
): State => {
  const intermediateReducer = combineReducers<State>({
    signIn,
    signUp
  });
  // combinReducerで取りまとめられたstateを取得
  const intermediateState = intermediateReducer(state, action);
  // 自作のcrossSlicerReducerで子要素間のstateを受け渡し
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
};

export default rootReducer;
