import { Profile } from 'service/backend-django-rest-errdepo/model';

/* Constants
 ***********************************************/
export enum ActionType {
  SIGN_OUT_START = 'SIGN_OUT_START',
  SIGN_OUT_SUCCEED = 'SIGN_OUT_SUCCEED',
  SIGN_OUT_FAIL = 'SIGN_OUT_FAIL',
  GET_PROFILE_START = 'GET_PROFILE_START',
  GET_PROFILE_SUCCEED = 'GET_PROFILE_SUCCEED',
  GET_PROFILE_FAIL = 'GET_PROFILE_FAIL',
  PUT_PROFILE_START = 'PUT_PROFILE_START',
  PUT_PROFILE_SUCCEED = 'PUT_PROFILE_SUCCEED',
  PUT_PROFILE_FAIL = 'PUT_PROFILE_FAIL'
}
/* Interface
 ***********************************************/
interface SignOutParams {}
interface GetProfileResult {
  profile: Profile;
}
export interface PutProfileParams {
  profile: Profile;
}
interface PutProfileResult {
  profile: Profile;
}
export type UserElement = SignOutParams;

/* Action
 ***********************************************/
export const signOut = {
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

export const getProfile = {
  start: () => ({
    type: ActionType.GET_PROFILE_START as typeof ActionType.GET_PROFILE_START
  }),

  succeed: (result: GetProfileResult) => ({
    type: ActionType.GET_PROFILE_SUCCEED as typeof ActionType.GET_PROFILE_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.GET_PROFILE_FAIL as typeof ActionType.GET_PROFILE_FAIL,
    payload: { error },
    err: true
  })
};

export const putProfile = {
  start: (param: PutProfileParams) => ({
    type: ActionType.PUT_PROFILE_START as typeof ActionType.PUT_PROFILE_START,
    payload: { param }
  }),

  succeed: (result: PutProfileResult) => ({
    type: ActionType.PUT_PROFILE_SUCCEED as typeof ActionType.PUT_PROFILE_SUCCEED,
    payload: { result }
  }),

  fail: (error: string) => ({
    type: ActionType.PUT_PROFILE_FAIL as typeof ActionType.PUT_PROFILE_FAIL,
    payload: { error },
    err: true
  })
};

export type UserAction =
  | ReturnType<typeof signOut.start>
  | ReturnType<typeof signOut.succeed>
  | ReturnType<typeof signOut.fail>
  | ReturnType<typeof getProfile.start>
  | ReturnType<typeof getProfile.succeed>
  | ReturnType<typeof getProfile.fail>
  | ReturnType<typeof putProfile.start>
  | ReturnType<typeof putProfile.succeed>
  | ReturnType<typeof putProfile.fail>;
