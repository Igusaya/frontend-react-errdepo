import { Reducer, combineReducers } from 'redux';

import signIn, {
  State as SignInState,
  Action as SignInAction,
  initialState as signInInitialState
} from 'reducers/user/signIn';
import signUp, {
  State as SignUpState,
  Action as SignUpAction,
  initialState as signUpInitialState
} from 'reducers/user/signUp';
import userMenu, {
  State as UserState,
  Action as UserAction,
  initialState as userInitialState
} from 'reducers/user/userMenu';
import { ActionType as UserActionType } from 'actions/userMenu';

export type Action = SignInAction | SignUpAction | UserAction;

export interface State {
  signIn: SignInState;
  signUp: SignUpState;
  userMenu: UserState;
}

export const initialState: State = {
  signIn: signInInitialState,
  signUp: signUpInitialState,
  userMenu: userInitialState
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
  switch (action.type) {
    case UserActionType.SIGN_OUT_SUCCEED:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          modalOpen: false
        },
        signUp: {
          ...state.signUp,
          modalOpen: false
        },
        userMenu: {
          ...state.userMenu
        }
      };
    default:
      return state;
  }
};

const userReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
): State => {
  const intermediateReducer = combineReducers<State>({
    signIn,
    signUp,
    userMenu
  });
  // combinReducerで取りまとめられたstateを取得
  const intermediateState = intermediateReducer(state, action);
  // 自作のcrossSlicerReducerで子要素間のstateを受け渡し
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
};

export default userReducer;
