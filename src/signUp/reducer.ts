import { Reducer } from 'redux';

import { ActionType, SignUpElement, SignUpAction } from 'signUp/action';

export type State = SignUpElement & {
  error?: string | null;
  modalOpen: boolean;
};

export const initialState: State = {
  inputUserName: '',
  inputEmail: '',
  inputPassword1: '',
  inputPassword2: '',
  key: '',
  modalOpen: false
};

export type Action = SignUpAction;

/* Reducer
 ***********************************************/
const reducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case ActionType.SIGN_UP_START:
      return {
        ...state,
        inputUserName: action.payload.inputUserName,
        inputPassword1: action.payload.inputPassword1,
        inputPassword2: action.payload.inputPassword2,
        inputEmail: action.payload.inputEmail
      };
    case ActionType.SIGN_UP_SUCCEED:
      return {
        ...state,
        modalOpen: true,
        error: null
      };
    case ActionType.SIGN_UP_FAIL:
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
