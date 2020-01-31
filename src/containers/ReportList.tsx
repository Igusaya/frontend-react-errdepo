import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ReportList from 'components/ReportList';
import { getReports } from '../actions/reportList';
import { State } from 'reducers';

interface DispatchProps {
  getReports: () => void;
}

const mapStateToProps = (state: State) => {
  return {
    reports: state.reportList.reportList.results
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getReports: () => dispatch(getReports.start())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
