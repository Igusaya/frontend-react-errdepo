import { Reducer } from 'redux';
import { AxiosError } from 'axios';

import { ActionType, SignInElement, SignInAction } from 'signIn/action';

export type State = SignInElement & {
  error?: AxiosError | null;
  modalOpen: boolean;
};

export const initialState: State = {
  inputUserName: '',
  inputPassword: '',
  modalOpen: false
};

export type Action = SignInAction;

const reducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
): State => {
  console.log('AuthReducer state:', state);
  console.log('AuthReducer action:', action);
  switch (action.type) {
    /* Sign in
     ***********************************************/
    case ActionType.SIGN_IN_START:
      return {
        ...state,
        inputUserName: action.payload.inputUserName,
        inputPassword: action.payload.inputPassword
      };
    case ActionType.SIGN_IN_SUCCEED:
      return {
        ...state,
        modalOpen: true
      };
    case ActionType.SIGN_IN_FAIL:
      return {
        ...state,
        error: action.payload.error
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;
      return state;
    }
  }
};

export default reducer;
