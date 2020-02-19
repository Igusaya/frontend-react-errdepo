import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';
import * as yup from 'yup';

import MakeReport, {
  MakeReportProps,
  MakeReportFormValue
} from 'components/MakeReport';
import {
  getLang,
  getConfirmReport,
  GetConfirmParam,
  postReport as postReportAction,
  PostReportPram,
  PutReportPram,
  putReport,
  getFwList
} from 'actions/report';
import { State } from 'reducers';

const Formik = withFormik<MakeReportProps, MakeReportFormValue>({
  mapPropsToValues: props => {
    return {
      inputLang: props.lang || '',
      inputFw: props.fw || '',
      inputEnv: props.env || 'os: \nversion: \nlibrary: \netc...',
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
  },
  validationSchema: yup.object().shape({
    inputLang: yup
      .string()
      .max(100, '言語は100文字以内で入力してください')
      .required('言語は必須です'),
    inputFw: yup
      .string()
      .max(100, 'Fw・library等は100文字以内で入力してください'),
    inputErrmsg: yup
      .string()
      .required(
        'エラーメッセージは必須です。特に記載内容がなければエラー概要でも載せてください。'
      )
  })
})(MakeReport);

interface DispatchProps {
  getLang: () => void;
  getFw: (lang: string) => void;
  getConfirm: (getConfirmParam: GetConfirmParam) => void;
  postReport: (postReportParam: PostReportPram) => void;
  putReport: (putReportParam: PutReportPram) => void;
}

const mapStateToProps = (state: State) => {
  return {
    langArray: state.report.lang,
    fwArray: state.report.fw,
    lang: state.report.report?.lang,
    fw: state.report.report?.fw,
    env: state.report.report?.env,
    errmsg: state.report.report?.errmsg,
    description: state.report.report?.description,
    correspondence: state.report.report?.correspondence,
    descriptionHTML: state.report.report?.descriptionHTML,
    correspondenceHTML: state.report.report?.correspondenceHTML,
    id: state.report.reportId,
    isFwLoading: state.report.isFwLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getLang: () => dispatch(getLang.start()),
    getFw: (lang: string) => dispatch(getFwList.start(lang)),
    getConfirm: getConfirmParam =>
      dispatch(getConfirmReport.start(getConfirmParam)),
    postReport: postReportParam =>
      dispatch(postReportAction.start(postReportParam)),
    putReport: putReportParam => dispatch(putReport.start(putReportParam))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Formik);
