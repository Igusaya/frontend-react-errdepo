import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';

import postReport, { ReportProps, ReportFormValue } from 'postReport/component';
import {
  getLang,
  getConfirmReport,
  GetConfirmParam,
  backToReport,
  postReport as postReportAction,
  PostReportPram
} from 'postReport/action';
import { State } from 'reducer';

const Formik = withFormik<ReportProps, ReportFormValue>({
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
})(postReport);

interface DispatchProps {
  getLang: () => void;
  getConfirm: (getConfirmParam: GetConfirmParam) => void;
  back: () => void;
  postReport: (postReportParam: PostReportPram) => void;
}

const mapStateToProps = (state: State) => {
  return {
    langArray: state.makeReport.lang,
    viewConfirm: state.makeReport.viewConfirm,
    lang: state.makeReport.report?.lang,
    fw: state.makeReport.report?.fw,
    env: state.makeReport.report?.env,
    errmsg: state.makeReport.report?.errmsg,
    description: state.makeReport.report?.description,
    correspondence: state.makeReport.report?.correspondence
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getLang: () => dispatch(getLang.start()),
    back: () => dispatch(backToReport.action()),
    getConfirm: getConfirmParam =>
      dispatch(getConfirmReport.start(getConfirmParam)),
    postReport: postReportParam =>
      dispatch(postReportAction.start(postReportParam))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Formik);
