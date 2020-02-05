import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ReportDetail from 'components/ReportDetail';
import { State } from 'reducers';
import {
  selectReportDetail,
  getReportDetail,
  deleteReport
} from 'actions/report';

interface DispatchProps {
  selectReport: (id: number) => void;
  getReport: (id: number) => void;
  deleteReport: (id: number) => void;
}

const mapStateToProps = (state: State) => {
  const report = state.reportList.reportList.results.find(
    report => report.id === state.report.reportId
  );

  let stateReport;
  if (report === undefined && state.report.report !== undefined) {
    stateReport = state.report.report;
  }

  // reportListが空の場合、componentでapiを叩く
  const id = state.reportList.reportList.count > 0 ? 0 : -1;

  return {
    report: {
      id: report?.id || stateReport?.id || id,
      created: report?.created || stateReport?.created || '',
      modify: report?.modify || stateReport?.modify || '',
      lang: report?.lang || stateReport?.lang || '',
      fw: report?.fw || stateReport?.fw || '',
      env: report?.env || stateReport?.env || '',
      errmsg: report?.errmsg || stateReport?.errmsg || '',
      description: report?.description || stateReport?.description || '',
      correspondence:
        report?.correspondence || stateReport?.correspondence || '',
      descriptionHTML:
        report?.descriptionHTML || stateReport?.descriptionHTML || '',
      correspondenceHTML:
        report?.correspondenceHTML || stateReport?.correspondenceHTML || '',
      owner_id: report?.owner_id || stateReport?.owner_id || 0,
      owner: report?.owner || stateReport?.owner || ''
    },
    user_id: state.user.userMenu.profile?.user_id || 0
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    selectReport: id => dispatch(selectReportDetail(id)),
    getReport: id => dispatch(getReportDetail.start(id)),
    deleteReport: id => dispatch(deleteReport.start(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail);
