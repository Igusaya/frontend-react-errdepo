import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';

import Search, { SearchProps, SearchFormValue } from 'components/Search';
import { State } from 'reducers';
import {
  searchReports,
  getExistsValues,
  getFwList,
  SearchParam,
  eraseFromFwList
} from 'actions/reportList';

const Formik = withFormik<SearchProps, SearchFormValue>({
  mapPropsToValues: props => {
    const inputWord =
      props.searchValue.words.length > 0 && props.searchValue.words[0] !== ''
        ? '"' + props.searchValue.words.join('" "') + '"'
        : '';
    return {
      inputWord: inputWord,
      inputLang: props.searchValue.langs,
      inputFw: props.searchValue.fws,
      inputCreater: props.searchValue.creaters
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
  eraseFw: (lang: string) => void;
}

const mapStateToProps = (state: State) => {
  return {
    langList: state.reportList.langList || [],
    fwList: state.reportList.fwList || [],
    createrList: state.reportList.createrList || [],
    searchValue: state.reportList.searchValue
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    search: param => dispatch(searchReports.start(param)),
    getExistsValues: () => dispatch(getExistsValues.start()),
    getFw: (lang: string) => dispatch(getFwList.start(lang)),
    eraseFw: (lang: string) => dispatch(eraseFromFwList(lang))
  };
};

const splitSearchWord = (word: string) => {
  const wqWordList = word.match(/"(\\.|[^"\\])*"/g);
  let noWqWordList: string[] = [];
  if (wqWordList?.length !== undefined && wqWordList?.length > 0) {
    // "で括られた文字列を切り出す
    wqWordList.map(wqWord => {
      word = word.replace(wqWord, '');
      return word;
    });
    // wqWordListの要素から"を抜く
    noWqWordList = wqWordList.map(wqWord => {
      return wqWord.replace(/"/g, '');
    });
  }

  // 全角空白を半角空白に置換
  word = word.replace('　', ' ');
  // 連続した半角空白を単一の半角空白に置換
  word = word.replace(/\s+/, ' ');
  // 半角空白でsplit
  const wordList = word.split(' ');
  // 配列を結合して返却
  return noWqWordList.concat(wordList);
};

export default connect(mapStateToProps, mapDispatchToProps)(Formik);
