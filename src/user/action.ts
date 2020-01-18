/* Constants
 ***********************************************/
export enum ActionType {
  SIGN_OUT_START = 'SIGN_OUT_START',
  SIGN_OUT_SUCCEED = 'SIGN_OUT_SUCCEED',
  SIGN_OUT_FAIL = 'SIGN_OUT_FAIL'
}
/* Interface
 ***********************************************/
interface SignOutParams {}
interface SignOutResult {}
export type UserElement = SignOutParams & SignOutResult;

/* Action
 ***********************************************/
export const user = {
  start: () => ({
    type: ActionType.SIGN_OUT_START as typeof ActionType.SIGN_OUT_START
  }),

  succeed: () => ({
    type: ActionType.SIGN_OUT_SUCCEED as typeof ActionType.SIGN_OUT_SUCCEED
  }),

  fail: (error: string) => ({
    type: ActionType.SIGN_OUT_FAIL as typeof ActionType.SIGN_OUT_FAIL,
    payload: { error },
    err: true
  })
};

export type UserAction =
  | ReturnType<typeof user.start>
  | ReturnType<typeof user.succeed>
  | ReturnType<typeof user.fail>;
