import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';

import Search, { SearchProps, SearchFormValue } from 'components/Search';
import { State } from 'reducers';
import {
  searchReports,
  getExistsValues,
  getFwList,
  SearchParam
} from 'actions/reportList';

const Formik = withFormik<SearchProps, SearchFormValue>({
  mapPropsToValues: props => {
    return {
      inputWord: '',
      inputLang: [],
      inputFw: [],
      inputCreater: []
    };
  },
  handleSubmit: (payload, { props }) => {
    props.search({
      inputWord: splitSearchWord(payload.inputWord) || [],
      inputLang: payload.inputLang,
      inputFw: payload.inputFw,
      inputCreater: payload.inputCreater
    });
  }
})(Search);

interface DispatchProps {
  search: (param: SearchParam) => void;
  getExistsValues: () => void;
  getFw: (lang: string) => void;
}

const mapStateToProps = (state: State) => {
  return {
    langList: state.reportList.langList || [],
    fwList: state.reportList.fwList || [],
    createrList: state.reportList.createrList || []
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    search: param => dispatch(searchReports.start(param)),
    getExistsValues: () => dispatch(getExistsValues.start()),
    getFw: (lang: string) => dispatch(getFwList.start(lang))
  };
};

const splitSearchWord = (word: string) => {
  // "で括られた文字列を切り出す
  const wqWordList = word.match(/"(\\.|[^"\\])*"/g);
  if (wqWordList?.length === undefined || wqWordList?.length === 0) {
    return null;
  }
  wqWordList.map(wqWord => {
    word = word.replace(wqWord, '');
  });
  // 全角空白を半角空白に置換
  word = word.replace('　', ' ');
  // 連続した半角空白を単一の半角空白に置換
  word = word.replace(/\s+/, ' ');
  // 半角空白でsplit
  const wordList = word.split(' ');
  // wqWordListの要素から"を抜く
  let noWqWordList = wqWordList.map(wqWord => {
    return wqWord.replace(/"/g, '');
  });
  // 配列を結合して返却
  return noWqWordList.concat(wordList);
};

export default connect(mapStateToProps, mapDispatchToProps)(Formik);
