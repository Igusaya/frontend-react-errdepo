import { expectSaga } from 'redux-saga-test-plan';

import { watchSignUp } from './saga';
import reducer, { initialState } from './reducer';
import { signUp } from './action';

/* Test
 ***********************************************/
describe('signUp saga', () => {
  const handlerMock = jest.fn();
  const signUpparam = {
    inputUserName: 'testuser',
    inputEmail: '',
    inputPassword1: 'testpass1',
    inputPassword2: 'testpass2'
  };

  it('should succeeded', async () => {
    handlerMock.mockReturnValue(() => {});
    // expectSaga(第一引数：テスト対象saga, 第二引数：テスト対象sagaの引数)
    return (
      expectSaga(watchSignUp, handlerMock)
        // dispatchしてActionの発行
        .dispatch(signUp.start(signUpparam))
        // 期待されるput
        .put(signUp.succeed())
        // 使用されるReducer
        .withReducer(reducer)
        // 最終的に期待されるstateの中身
        .hasFinalState({
          ...initialState,
          ...signUpparam,
          modalOpen: true,
          error: null
        })
        // Warningを抑制するため silentRun(1)を使用
        .silentRun(1)
    );
  });

  it('should 400 failed', async () => {
    const error = {
      message:
        'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
    };
    handlerMock.mockReturnValue(() => {
      throw new Error(error.message);
    });

    return expectSaga(watchSignUp, handlerMock)
      .dispatch(signUp.start(signUpparam))
      .put(signUp.fail(error.message))
      .withReducer(reducer)
      .hasFinalState({ ...initialState, ...signUpparam, error: error.message })
      .silentRun(1);
  });
});
