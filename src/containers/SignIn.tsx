import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';
import * as yup from 'yup';

import SignIn, { SignInFormValue, SignInProps } from 'components/SignIn';
import { signIn } from 'actions/signIn';
import { State } from 'reducers';

const Formik = withFormik<SignInProps, SignInFormValue>({
  mapPropsToValues: () => {
    return {
      inputUserName: '',
      inputPassword: '',
      modalOpen: false
    };
  },
  // submit押下時の挙動
  handleSubmit: (payload, { props, setSubmitting }) => {
    props.signIn({
      inputUserName: payload.inputUserName,
      inputPassword: payload.inputPassword
    });
    setSubmitting(false);
    //resetForm();
  },
  // バリデ設定
  validationSchema: yup.object().shape({
    inputUserName: yup
      .string()
      .max(30, 'nameは30文字以内で入力してください')
      .required('nameは必須です'),
    inputPassword: yup
      .string()
      .min(6, 'passwordは6文字以上で入力してください')
      .max(30, 'passwordは30文字以内で入力してください')
      .required('passwordは必須です')
  })
})(SignIn);

interface DispatchProps {
  signIn: (signInFormValues: SignInFormValue) => void;
}

const mapStateToProps = (state: State) => {
  return {
    modalOpen: state.user.signIn.modalOpen,
    error: state.user.signIn.error || ''
  };
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    signIn: signInFormValues => dispatch(signIn.start(signInFormValues))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Formik);
