import { Reducer, combineReducers } from 'redux';

import signIn, {
  State as SignInState,
  Action as SignInAction,
  initialState as signInInitialState
} from 'signIn/reducer';
import signUp, {
  State as SignUpState,
  Action as SignUpAction,
  initialState as signUpInitialState
} from 'signUp/reducer';
import user, {
  State as UserState,
  Action as UserAction,
  initialState as userInitialState
} from 'user/reducer';
import { ActionType } from 'user/action';

type Action = SignInAction | SignUpAction | UserAction;

export interface State {
  signIn: SignInState;
  signUp: SignUpState;
  user: UserState;
}

const initialState: State = {
  signIn: signInInitialState,
  signUp: signUpInitialState,
  user: userInitialState
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
  switch (action.type) {
    case ActionType.SIGN_OUT_SUCCEED:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          modalOpen: false
        },
        signUp: {
          ...state.signUp,
          modalOpen: false
        }
        // TODO: user情報取得作成したら、このタイミングで削除する
      };
    default:
      return state;
  }
};

const rootReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
): State => {
  const intermediateReducer = combineReducers<State>({
    signIn,
    signUp,
    user
  });
  // combinReducerで取りまとめられたstateを取得
  const intermediateState = intermediateReducer(state, action);
  // 自作のcrossSlicerReducerで子要素間のstateを受け渡し
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
};

export default rootReducer;
