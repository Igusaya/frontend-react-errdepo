import { expectSaga } from 'redux-saga-test-plan';

import {
  watchGetLang,
  watchPostReport,
  watchGetConfirm,
  watchGetReportDetail,
  watchPutReport,
  watchGetFwList,
  watchDeleteReport
} from '../report';
import reportReducer, { initialState } from '../../reducers/report';
import {
  getLang,
  postReport,
  getConfirmReport,
  getReportDetail,
  putReport,
  getFwList,
  deleteReport
} from '../../actions/report';

/* Test
 ***********************************************/
describe('report saga', () => {
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
      correspondence: 'fdsfs',
      descriptionHTML: 'testparam1',
      correspondenceHTML: 'testparam2'
    };
    const getConfirmResult = {
      descriptionHTML: 'resultdfstt',
      correspondenceHTML: 'resuletfdsfstt'
    };
    handlerMock.mockReturnValue(() => getConfirmResult);
    return expectSaga(watchGetConfirm, handlerMock)
      .dispatch(getConfirmReport.start(getConfirmParam))
      .put(getConfirmReport.succeed(getConfirmResult))
      .withReducer(reportReducer)
      .hasFinalState({
        ...initialState,
        report: { ...getConfirmParam, ...getConfirmResult }
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
      correspondence: 'correspondenceTest',
      descriptionHTML: 'testparam1',
      correspondenceHTML: 'testparam2'
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
      correspondence: 'correspondenceTest',
      descriptionHTML: 'testparam1',
      correspondenceHTML: 'testparam2'
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

  it('should get report detail succeeded', async () => {
    const getReportDetailResult = {
      id: 1,
      created: '2020-01-31T12:48:02.209577+09:00',
      modify: '2020-01-31 12:48:02',
      lang: 'Python',
      fw: 'Django-Rest',
      env: 'dflksajflkasjfdlkasjflkdasjlkfjsdlkjfslkjflsa',
      errmsg: 'dflksajflkasjfdlkasjflkdasjlkfjsdlkjfslkjflsa',
      description: '<p>bbbbbbbbbbbbbbb</p>',
      correspondence: '<p>fsdafdsafdsafda</p>',
      descriptionHTML: 'testparam1',
      correspondenceHTML: 'testparam2',
      owner_id: 26,
      owner: 'たなか'
    };
    handlerMock.mockReturnValue(() => getReportDetailResult);
    return expectSaga(watchGetReportDetail, handlerMock)
      .dispatch(getReportDetail.start(1))
      .put(getReportDetail.succeed(getReportDetailResult))
      .withReducer(reportReducer)
      .hasFinalState({
        ...initialState,
        reportId: 1,
        report: { ...getReportDetailResult }
      })
      .silentRun(1);
  });

  it('should get report detail 500 failed', async () => {
    handlerMock.mockReturnValue(() => {
      throw new Error('err');
    });
    return expectSaga(watchGetReportDetail, handlerMock)
      .dispatch(getReportDetail.start(1))
      .put(getReportDetail.fail('err'))
      .withReducer(reportReducer)
      .hasFinalState({
        ...initialState,
        reportId: 1,
        error: 'err',
        err: true
      })
      .silentRun(1);
  });

  it('should put report succeeded', async () => {
    const putReportResult = {
      id: 1,
      created: '2020-01-31T12:48:02.209577+09:00',
      modify: '2020-01-31 12:48:02',
      lang: 'Python',
      fw: 'Django-Rest',
      env: 'dflksajflkasjfdlkasjflkdasjlkfjsdlkjfslkjflsa',
      errmsg: 'dflksajflkasjfdlkasjflkdasjlkfjsdlkjfslkjflsa',
      description: '<p>bbbbbbbbbbbbbbb</p>',
      correspondence: '<p>fsdafdsafdsafda</p>',
      descriptionHTML: 'testparam1',
      correspondenceHTML: 'testparam2',
      owner_id: 26,
      owner: 'たなか'
    };
    handlerMock.mockReturnValue(() => putReportResult);
    return expectSaga(watchPutReport, handlerMock)
      .dispatch(
        putReport.start({
          id: 1,
          lang: 'Python',
          fw: 'Django-Rest',
          env: 'dflksajflkasjfdlkasjflkdasjlkfjsdlkjfslkjflsa',
          errmsg: 'dflksajflkasjfdlkasjflkdasjlkfjsdlkjfslkjflsa',
          description: '<p>bbbbbbbbbbbbbbb</p>',
          correspondence: '<p>fsdafdsafdsafda</p>',
          descriptionHTML: 'testparam1',
          correspondenceHTML: 'testparam2'
        })
      )
      .put(putReport.succeed(putReportResult))
      .withReducer(reportReducer)
      .hasFinalState({
        ...initialState,
        report: { ...putReportResult }
      })
      .silentRun(1);
  });

  it('should put report 500 failed', async () => {
    handlerMock.mockReturnValue(() => {
      throw new Error('err');
    });
    const param = {
      id: 1,
      lang: 'Python',
      fw: 'Django-Rest',
      env: 'dflksajflkasjfdlkasjflkdasjlkfjsdlkjfslkjflsa',
      errmsg: 'dflksajflkasjfdlkasjflkdasjlkfjsdlkjfslkjflsa',
      description: '<p>bbbbbbbbbbbbbbb</p>',
      correspondence: '<p>fsdafdsafdsafda</p>',
      descriptionHTML: 'testparam1',
      correspondenceHTML: 'testparam2'
    };
    return expectSaga(watchPutReport, handlerMock)
      .dispatch(putReport.start(param))
      .put(putReport.fail('err'))
      .withReducer(reportReducer)
      .hasFinalState({
        ...initialState,
        report: { ...param },
        error: 'err',
        err: true
      })
      .silentRun(1);
  });

  it('should get fw list succeeded', async () => {
    const testData = [
      { lang: 'test', fw: 'test2' },
      { lang: 'test3', fw: 'test4' }
    ];
    handlerMock.mockReturnValue(() => testData);
    return expectSaga(watchGetFwList, handlerMock)
      .dispatch(getFwList.start('test'))
      .put(getFwList.succeed(testData))
      .withReducer(reportReducer)
      .hasFinalState({
        ...initialState,
        fw: testData
      })
      .silentRun(1);
  });

  it('should get fw list 500 failed', async () => {
    handlerMock.mockReturnValue(() => {
      throw new Error('ただ込');
    });
    return expectSaga(watchGetFwList, handlerMock)
      .dispatch(getFwList.start('test'))
      .put(getFwList.fail('ただ込'))
      .withReducer(reportReducer)
      .hasFinalState({ ...initialState, error: 'ただ込', err: true })
      .silentRun(1);
  });

  it('should delete report succeeded', async () => {
    handlerMock.mockReturnValue(() => {});
    return expectSaga(watchDeleteReport, handlerMock)
      .dispatch(deleteReport.start(1))
      .put(deleteReport.succeed(1))
      .withReducer(reportReducer)
      .hasFinalState({
        ...initialState,
        reportId: undefined,
        report: undefined
      })
      .silentRun(1);
  });

  it('should delete report 500 failed', async () => {
    handlerMock.mockReturnValue(() => {
      throw new Error('ただ込');
    });
    return expectSaga(watchDeleteReport, handlerMock)
      .dispatch(deleteReport.start(1))
      .withReducer(reportReducer)
      .hasFinalState({ ...initialState, error: 'ただ込', err: true })
      .silentRun(1);
  });
});
