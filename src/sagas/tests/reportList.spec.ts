import { expectSaga } from 'redux-saga-test-plan';

import {
  watchGetLang,
  watchPostReport,
  watchGetConfirm,
  watchGetReportDetail
} from '../report';
import reportListReducer, { initialState } from 'reducers/reportList';
import { getReportList } from 'actions/reportList';
import { watchGetReportList } from 'sagas/reportList';

/* Test
 ***********************************************/
describe('report list saga', () => {
  const handlerMock = jest.fn();

  it('should get ReportList succeeded', async () => {
    const testData = {
      count: 1,
      next: 'next',
      previous: 'prev',
      resuluts: [
        {
          id: 1,
          created: 'test',
          modify: 'test',
          lang: 'string',
          fw: 'string',
          env: 'string',
          errmsg: 'string',
          description: 'string',
          correspondence: 'string',
          owner_id: 1,
          owner: 'string'
        },
        {
          id: 2,
          created: 'test',
          modify: 'test',
          lang: 'string',
          fw: 'string',
          env: 'string',
          errmsg: 'string',
          description: 'string',
          correspondence: 'string',
          owner_id: 1,
          owner: 'string'
        }
      ]
    };

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

  it('should get lang 500 failed', async () => {
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
});
