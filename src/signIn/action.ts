import { AxiosError } from 'axios';

/* Constants
 ***********************************************/
export enum ActionType {
  SIGN_IN_START = 'SIGN_IN_START',
  SIGN_IN_SUCCEED = 'SIGN_IN_SUCCEED',
  SIGN_IN_FAIL = 'SIGN_IN_FAIL'
}

/* Interface
 ***********************************************/
interface SignInParams {
  inputUserName: string;
  inputPassword: string;
}

export type SignInElement = SignInParams;

/* Action
 ***********************************************/
export const signIn = {
  start: (params: SignInParams) => ({
    type: ActionType.SIGN_IN_START as typeof ActionType.SIGN_IN_START,
    payload: params
  }),

  succeed: () => ({
    type: ActionType.SIGN_IN_SUCCEED as typeof ActionType.SIGN_IN_SUCCEED
  }),

  fail: (error: AxiosError) => ({
    type: ActionType.SIGN_IN_FAIL as typeof ActionType.SIGN_IN_FAIL,
    payload: { error },
    err: true
  })
};

export type SignInAction =
  | ReturnType<typeof signIn.start>
  | ReturnType<typeof signIn.succeed>
  | ReturnType<typeof signIn.fail>;
