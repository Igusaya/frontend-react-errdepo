import { expectSaga } from 'redux-saga-test-plan';

import { watchGetLang, watchPostReport, watchGetConfirm } from '../report';
import reportReducer, { initialState } from '../../reducers/report';
import { getLang, postReport, getConfirmReport } from '../../actions/report';

/* Test
 ***********************************************/
describe('user saga', () => {
  const handlerMock = jest.fn();

  it('should get lang succeeded', async () => {
    handlerMock.mockReturnValue(() => ['test1', 'test2']);
    // expectSaga(第一引数：テスト対象saga, 第二引数：テスト対象sagaの引数)
    return (
      expectSaga(watchGetLang, handlerMock)
        // dispatchしてActionの発行
        .dispatch(getLang.start())
        // 期待されるput
        .put(getLang.succeed(['test1', 'test2']))
        // 使用されるReducer
        .withReducer(reportReducer)
        // 最終的に期待されるstateの中身
        .hasFinalState({
          ...initialState,
          lang: ['test1', 'test2']
        })
        // Warningを抑制するため silentRun(1)を使用
        .silentRun(1)
    );
  });

  it('should get lang 500 failed', async () => {
    handlerMock.mockReturnValue(() => {
      throw new Error('ただ込');
    });
    return expectSaga(watchGetLang, handlerMock)
      .dispatch(getLang.start())
      .put(getLang.fail('ただ込'))
      .withReducer(reportReducer)
      .hasFinalState({ ...initialState, error: 'ただ込', err: true })
      .silentRun(1);
  });

  it('should get confirm succeeded', async () => {
    const getConfirmParam = {
      lang: 'ANTLR With ActionScript Target',
      fw: 'fw',
      env: 'os: version: library: etc...',
      errmsg: 'fdsfsd',
      description: 'dfs',
      correspondence: 'fdsfs'
    };
    const getConfirmResult = {
      description: 'dfstt',
      correspondence: 'fdsfstt'
    };
    handlerMock.mockReturnValue(() => getConfirmResult);
    return expectSaga(watchGetConfirm, handlerMock)
      .dispatch(getConfirmReport.start(getConfirmParam))
      .put(getConfirmReport.succeed(getConfirmResult))
      .withReducer(reportReducer)
      .hasFinalState({
        ...initialState,
        report: { ...getConfirmParam, ...getConfirmResult },
        viewConfirm: true
      })
      .silentRun(1);
  });

  it('should get confirm 500 failed', async () => {
    const getConfirmParam = {
      lang: 'ANTLR With ActionScript Target',
      fw: 'fw',
      env: 'os: version: library: etc...',
      errmsg: 'fdsfsd',
      description: 'dfs',
      correspondence: 'fdsfs'
    };

    handlerMock.mockReturnValue(() => {
      throw new Error('err');
    });
    return expectSaga(watchGetConfirm, handlerMock)
      .dispatch(getConfirmReport.start(getConfirmParam))
      .put(getConfirmReport.fail('err'))
      .withReducer(reportReducer)
      .hasFinalState({
        ...initialState,
        report: {
          ...getConfirmParam
        },
        error: 'err',
        err: true
      })
      .silentRun(1);
  });

  it('should post report succeeded', async () => {
    const postReportParam = {
      lang: 'Python',
      fw: 'Django-REST',
      env: 'os: mac\nfront end: React',
      errmsg: "NameError: name 'true' is not defined",
      description: '<p>trueなんて変数ないよ</p>',
      correspondence: 'correspondenceTest'
    };
    const postReportResult = {
      ...postReportParam,
      id: 18,
      created: '2020-01-29T00:06:56.353759+09:00',
      modify: '2020-01-29T00:06:56.353805+09:00',
      owner_id: 23,
      owner: 'javascript'
    };
    handlerMock.mockReturnValue(() => postReportResult);
    return expectSaga(watchPostReport, handlerMock)
      .dispatch(postReport.start(postReportParam))
      .put(postReport.succeed(postReportResult))
      .withReducer(reportReducer)
      .hasFinalState({ ...initialState, report: { ...postReportResult } })
      .silentRun(1);
  });

  it('should post report 500 failed', async () => {
    const postReportParam = {
      lang: 'Python',
      fw: 'Django-REST',
      env: 'os: mac\nfront end: React',
      errmsg: "NameError: name 'true' is not defined",
      description: '<p>trueなんて変数ないよ</p>',
      correspondence: 'correspondenceTest'
    };
    handlerMock.mockReturnValue(() => {
      throw new Error('err');
    });
    return expectSaga(watchPostReport, handlerMock)
      .dispatch(postReport.start(postReportParam))
      .put(postReport.fail('err'))
      .withReducer(reportReducer)
      .hasFinalState({ ...initialState, error: 'err', err: true })
      .silentRun(1);
  });
});
