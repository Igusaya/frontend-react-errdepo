import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';

import MakeReport, {
  MakeReportProps,
  MakeReportFormValue
} from 'components/MakeReport';
import {
  getLang,
  getConfirmReport,
  GetConfirmParam,
  backToReport,
  postReport as postReportAction,
  PostReportPram,
  PutReportPram,
  putReport
} from 'actions/report';
import { State } from 'reducers';

const Formik = withFormik<MakeReportProps, MakeReportFormValue>({
  mapPropsToValues: props => {
    return {
      inputLang: props.lang || '',
      inputFw: props.fw || '',
      inputEnv: props.errmsg || 'os: \nversion: \nlibrary: \netc...',
      inputErrmsg: props.errmsg || '',
      inputDescription: props.description || '',
      inputCorrespondence: props.correspondence || ''
    };
  },
  handleSubmit: (payload, { props, setSubmitting }) => {
    props.getConfirm({
      lang: payload.inputLang,
      fw: payload.inputFw,
      env: payload.inputEnv,
      errmsg: payload.inputErrmsg,
      description: payload.inputDescription,
      correspondence: payload.inputCorrespondence
    });
  }
})(MakeReport);

interface DispatchProps {
  getLang: () => void;
  getConfirm: (getConfirmParam: GetConfirmParam) => void;
  back: () => void;
  postReport: (postReportParam: PostReportPram) => void;
  putReport: (putReportParam: PutReportPram) => void;
}

const mapStateToProps = (state: State) => {
  return {
    langArray: state.report.lang,
    viewConfirm: state.report.viewConfirm,
    lang: state.report.report?.lang,
    fw: state.report.report?.fw,
    env: state.report.report?.env,
    errmsg: state.report.report?.errmsg,
    description: state.report.report?.description,
    correspondence: state.report.report?.correspondence,
    descriptionHTML: state.report.report?.descriptionHTML,
    correspondenceHTML: state.report.report?.correspondenceHTML,
    id: state.report.reportId
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getLang: () => dispatch(getLang.start()),
    back: () => dispatch(backToReport.action()),
    getConfirm: getConfirmParam =>
      dispatch(getConfirmReport.start(getConfirmParam)),
    postReport: postReportParam =>
      dispatch(postReportAction.start(postReportParam)),
    putReport: putReportParam => dispatch(putReport.start(putReportParam))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Formik);
