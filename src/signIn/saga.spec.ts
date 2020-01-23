import { expectSaga } from 'redux-saga-test-plan';

import { watchSignIn } from './saga';
import reducer, { initialState } from './reducer';
import { signIn } from './action';

/* Test
 ***********************************************/
describe('signIn saga', () => {
  const handlerMock = jest.fn();
  const signInparam = {
    inputUserName: 'testuser',
    inputPassword: 'testpass'
  };

  it('should succeeded', async () => {
    handlerMock.mockReturnValue(() => {});
    // expectSaga(第一引数：テスト対象saga, 第二引数：テスト対象sagaの引数)
    return (
      expectSaga(watchSignIn, handlerMock)
        // dispatchしてActionの発行
        .dispatch(signIn.start(signInparam))
        // 期待されるput
        .put(signIn.succeed())
        // 使用されるReducer
        .withReducer(reducer)
        // 最終的に期待されるstateの中身
        .hasFinalState({
          ...initialState,
          ...signInparam,
          modalOpen: true,
          error: null
        })
        // Warningを抑制するため silentRun(1)を使用
        .silentRun(1)
    );
  });

  it('should 400 failed', async () => {
    const error = {
      message: '資格情報が誤ってます'
    };
    handlerMock.mockReturnValue(() => {
      throw new Error(error.message);
    });

    return expectSaga(watchSignIn, handlerMock)
      .dispatch(signIn.start(signInparam))
      .put(signIn.fail(error.message))
      .withReducer(reducer)
      .hasFinalState({ ...initialState, ...signInparam, error: error.message })
      .silentRun(1);
  });
});
