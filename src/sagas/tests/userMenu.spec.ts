import { expectSaga } from 'redux-saga-test-plan';

import { watchSignOut, watchGetProfile, watchPutProfile } from '../userMenu';
import userMenuReducer, { initialState } from 'reducers/user/userMenu';
import { signOut, getProfile, putProfile } from 'actions/userMenu';

/* Test
 ***********************************************/
describe('user saga', () => {
  const handlerMock = jest.fn();

  it('should sign out succeeded', async () => {
    handlerMock.mockReturnValue(() => {});
    // expectSaga(第一引数：テスト対象saga, 第二引数：テスト対象sagaの引数)
    return (
      expectSaga(watchSignOut, handlerMock)
        // dispatchしてActionの発行
        .dispatch(signOut.start())
        // 期待されるput
        .put(signOut.succeed())
        // 使用されるReducer
        .withReducer(userMenuReducer)
        // 最終的に期待されるstateの中身
        .hasFinalState({
          ...initialState,
          profile: undefined
        })
        // Warningを抑制するため silentRun(1)を使用
        .silentRun(1)
    );
  });

  it('should sign out 400 failed', async () => {
    const error = {
      message:
        'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
    };
    handlerMock.mockReturnValue(() => {
      throw new Error(error.message);
    });

    return expectSaga(watchSignOut, handlerMock)
      .dispatch(signOut.start())
      .put(signOut.fail(error.message))
      .withReducer(userMenuReducer)
      .hasFinalState({ ...initialState, error: error.message })
      .silentRun(1);
  });

  it('should get profile succeeded', async () => {
    const result = {
      profile: {
        id: 1,
        user_id: 2,
        username: 'testname',
        email: 'test@test.com',
        last_login: '20200101',
        image: 'image',
        description: '',
        modify: '20200101'
      }
    };
    handlerMock.mockReturnValue(() => result);
    // expectSaga(第一引数：テスト対象saga, 第二引数：テスト対象sagaの引数)
    return (
      expectSaga(watchGetProfile, handlerMock)
        // dispatchしてActionの発行
        .dispatch(getProfile.start())
        // 期待されるput
        .put(getProfile.succeed({ profile: result.profile }))
        // 使用されるReducer
        .withReducer(userMenuReducer)
        // 最終的に期待されるstateの中身
        .hasFinalState({
          ...initialState,
          ...result
        })
        // Warningを抑制するため silentRun(1)を使用
        .silentRun(1)
    );
  });

  it('should get profile 500 failed', async () => {
    const error = {
      message:
        'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
    };
    handlerMock.mockReturnValue(() => {
      throw new Error(error.message);
    });

    return expectSaga(watchGetProfile, handlerMock)
      .dispatch(getProfile.start())
      .put(getProfile.fail(error.message))
      .withReducer(userMenuReducer)
      .hasFinalState({ ...initialState, error: error.message })
      .silentRun(1);
  });

  it('should put profile succeeded', async () => {
    const result = {
      profile: {
        id: 1,
        user_id: 2,
        username: 'testname',
        email: 'test@test.com',
        last_login: '20200101',
        image: 'updateimage',
        description: '',
        modify: '20200101'
      }
    };
    const param = {
      profile: {
        ...result.profile,
        image: 'image'
      }
    };
    handlerMock.mockReturnValue(() => result);
    // expectSaga(第一引数：テスト対象saga, 第二引数：テスト対象sagaの引数)
    return (
      expectSaga(watchPutProfile, handlerMock)
        // dispatchしてActionの発行
        .dispatch(putProfile.start(param))
        // 期待されるput
        .put(putProfile.succeed({ profile: result.profile }))
        // 使用されるReducer
        .withReducer(userMenuReducer)
        // 最終的に期待されるstateの中身
        .hasFinalState({
          ...initialState,
          ...result
        })
        // Warningを抑制するため silentRun(1)を使用
        .silentRun(1)
    );
  });

  it('should put profile 500 failed', async () => {
    const param = {
      profile: {
        id: 1,
        user_id: 2,
        username: 'testname',
        email: 'test@test.com',
        last_login: '20200101',
        image: 'image',
        description: '',
        modify: '20200101'
      }
    };

    const error = {
      message:
        'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
    };
    handlerMock.mockReturnValue(() => {
      throw new Error(error.message);
    });

    return expectSaga(watchPutProfile, handlerMock)
      .dispatch(putProfile.start(param))
      .put(putProfile.fail(error.message))
      .withReducer(userMenuReducer)
      .hasFinalState({ ...initialState, ...param, error: error.message })
      .silentRun(1);
  });
});
