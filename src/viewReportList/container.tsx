import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Reports from 'viewReportList/component';
import { getReports, getReportDetail } from './action';
import { State } from 'reducer';

interface DispatchProps {
  getReports: () => void;
  getReportDetail: (id: number) => void;
}

const mapStateToProps = (state: State) => {
  return {
    reports: state.viewReportList.reports
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getReports: () => dispatch(getReports.start()),
    getReportDetail: id => dispatch(getReportDetail.start(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
