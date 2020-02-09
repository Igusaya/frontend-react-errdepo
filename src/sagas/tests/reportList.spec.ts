import { expectSaga } from 'redux-saga-test-plan';

import reportListReducer, { initialState } from 'reducers/reportList';
import {
  getReportList,
  getMoreReports,
  getExistsValues,
  getFwList,
  searchReports
} from 'actions/reportList';
import {
  watchGetReportList,
  watchGetMoreReports,
  watchGetExistsValues,
  watchGetFwList,
  watchGetSearchReports
} from 'sagas/reportList';

/* Test
 ***********************************************/
describe('report list saga', () => {
  const handlerMock = jest.fn();
  const testData = {
    count: 40,
    next: 'http://localhost:8000/report/?page=3',
    previous: 'http://localhost:8000/report/?page=1',
    results: [
      {
        id: 28,
        created: '2020-01-31T11:31:51.204710+09:00',
        modify: '2020-01-31T11:31:51.204710+09:00',
        lang: 'Python',
        fw: 'Django-Rest',
        env: 'os: mac\nversion: \nlibrary: \netc...',
        errmsg: 'testerr1',
        description: 'testdes1',
        correspondence: 'testcor1',
        descriptionHTML: '<p>testdes1</p>',
        correspondenceHTML: '<p>testcor1</p>',
        owner_id: 26,
        owner: 'たなか'
      },
      {
        id: 27,
        created: '2020-01-31T11:31:50.724874+09:00',
        modify: '2020-01-31T11:31:50.724874+09:00',
        lang: 'Java',
        fw: 'EE7',
        env: 'os: windows\nversion: \nlibrary: \netc...',
        errmsg: 'testerr2',
        description: 'testdes2',
        correspondence: 'testcor2',
        descriptionHTML: '<p>testdes2</p>',
        correspondenceHTML: '<p>testcor2</p>',
        owner_id: 27,
        owner: 'すずき'
      }
    ]
  };

  it('should get ReportList succeeded', async () => {
    handlerMock.mockReturnValue(() => testData);
    // expectSaga(第一引数：テスト対象saga, 第二引数：テスト対象sagaの引数)
    return (
      expectSaga(watchGetReportList, handlerMock)
        // dispatchしてActionの発行
        .dispatch(getReportList.start())
        // 期待されるput
        .put(getReportList.succeed(testData))
        // 使用されるReducer
        .withReducer(reportListReducer)
        // 最終的に期待されるstateの中身
        .hasFinalState({
          ...initialState,
          reportList: testData
        })
        // Warningを抑制するため silentRun(1)を使用
        .silentRun(1)
    );
  });

  it('should get ReportList 500 failed', async () => {
    handlerMock.mockReturnValue(() => {
      throw new Error('ただ込');
    });
    return expectSaga(watchGetReportList, handlerMock)
      .dispatch(getReportList.start())
      .put(getReportList.fail('ただ込'))
      .withReducer(reportListReducer)
      .hasFinalState({ ...initialState, error: 'ただ込', err: true })
      .silentRun(1);
  });

  it('should get moreReports succeeded', async () => {
    handlerMock.mockReturnValue(() => testData);
    // expectSaga(第一引数：テスト対象saga, 第二引数：テスト対象sagaの引数)
    return (
      expectSaga(watchGetMoreReports, handlerMock)
        // dispatchしてActionの発行
        .dispatch(getMoreReports.start('report/?page=2'))
        // 期待されるput
        .put(getMoreReports.succeed(testData))
        // 使用されるReducer
        .withReducer(reportListReducer)
        // 最終的に期待されるstateの中身
        .hasFinalState({
          ...initialState,
          reportList: testData
        })
        // Warningを抑制するため silentRun(1)を使用
        .silentRun(1)
    );
  });

  it('should get more reports 500 failed', async () => {
    handlerMock.mockReturnValue(() => {
      throw new Error('ただ込');
    });
    return expectSaga(watchGetMoreReports, handlerMock)
      .dispatch(getMoreReports.start('report/?page=2'))
      .put(getMoreReports.fail('ただ込'))
      .withReducer(reportListReducer)
      .hasFinalState({ ...initialState, error: 'ただ込', err: true })
      .silentRun(1);
  });

  it('should get exists values succeeded', async () => {
    handlerMock.mockReturnValue(() => ({
      langList: ['lang1', 'lang2'],
      createrList: ['user1', 'user2']
    }));
    return expectSaga(watchGetExistsValues, handlerMock)
      .dispatch(getExistsValues.start())
      .put(
        getExistsValues.succeed({
          langList: ['lang1', 'lang2'],
          createrList: ['user1', 'user2']
        })
      )
      .withReducer(reportListReducer)
      .hasFinalState({
        ...initialState,
        langList: ['lang1', 'lang2'],
        createrList: ['user1', 'user2']
      })
      .silentRun(1);
  });

  it('should get exists values 500 failed', async () => {
    handlerMock.mockReturnValue(() => {
      throw new Error('ただ込');
    });
    return expectSaga(watchGetExistsValues, handlerMock)
      .dispatch(getExistsValues.start())
      .put(getExistsValues.fail('ただ込'))
      .withReducer(reportListReducer)
      .hasFinalState({ ...initialState, error: 'ただ込', err: true })
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
      .withReducer(reportListReducer)
      .hasFinalState({
        ...initialState,
        fwList: testData
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
      .withReducer(reportListReducer)
      .hasFinalState({ ...initialState, error: 'ただ込', err: true })
      .silentRun(1);
  });

  it('should get search reports succeeded', async () => {
    handlerMock.mockReturnValue(() => testData);
    return expectSaga(watchGetSearchReports, handlerMock)
      .dispatch(
        searchReports.start({
          inputWord: [],
          inputLang: [],
          inputFw: [],
          inputCreater: ['test']
        })
      )
      .put(searchReports.succeed(testData))
      .withReducer(reportListReducer)
      .hasFinalState({
        ...initialState,
        reportList: testData,
        isShowingSearchResults: true,
        searchValue: {
          words: [],
          langs: [],
          fws: [],
          creaters: ['test']
        }
      })
      .silentRun(1);
  });

  it('should get search reports 500 failed', async () => {
    handlerMock.mockReturnValue(() => {
      throw new Error('ただ込');
    });
    return expectSaga(watchGetSearchReports, handlerMock)
      .dispatch(
        searchReports.start({
          inputWord: [],
          inputLang: [],
          inputFw: [],
          inputCreater: ['test']
        })
      )
      .put(searchReports.fail('ただ込'))
      .withReducer(reportListReducer)
      .hasFinalState({
        ...initialState,
        error: 'ただ込',
        err: true,
        searchValue: {
          words: [],
          langs: [],
          fws: [],
          creaters: ['test']
        }
      })
      .silentRun(1);
  });
});
