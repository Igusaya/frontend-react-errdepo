import { AxiosError } from 'axios';

/* Constants
 ***********************************************/
export enum ActionType {
  SIGN_UP_START = 'SIGN_UP_START',
  SIGN_UP_SUCCEED = 'SIGN_UP_SUCCEED',
  SIGN_UP_FAIL = 'SIGN_UP_FAIL'
}
/* Interface
 ***********************************************/
interface SignUpParams {
  inputUserName: string;
  inputEmail: string;
  inputPassword1: string;
  inputPassword2: string;
}
interface SignUpResult {
  key: string;
}
export type SignUpElement = SignUpParams & SignUpResult;

/* Action
 ***********************************************/
export const signUp = {
  start: (params: SignUpParams) => ({
    type: ActionType.SIGN_UP_START as typeof ActionType.SIGN_UP_START,
    payload: params
  }),

  succeed: () => ({
    type: ActionType.SIGN_UP_SUCCEED as typeof ActionType.SIGN_UP_SUCCEED
  }),

  fail: (error: AxiosError) => ({
    type: ActionType.SIGN_UP_FAIL as typeof ActionType.SIGN_UP_FAIL,
    payload: { error },
    err: true
  })
};

export type SignUpAction =
  | ReturnType<typeof signUp.start>
  | ReturnType<typeof signUp.succeed>
  | ReturnType<typeof signUp.fail>;
