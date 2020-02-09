import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ReportList from 'components/ReportList';
import { getReportList, getMoreReports } from '../actions/reportList';
import { State } from 'reducers';

interface DispatchProps {
  getReports: () => void;
  getMoreReports: (url: string) => void;
}

const mapStateToProps = (state: State) => {
  return {
    reports: state.reportList.reportList.results,
    isLoading: state.reportList.isLoading,
    isSearchLoading: state.reportList.isSearchLoading,
    nextUrl: state.reportList.reportList.next || '',
    isShowingSearchResults: state.reportList.isShowingSearchResults
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getReports: () => dispatch(getReportList.start()),
    getMoreReports: url => dispatch(getMoreReports.start(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
