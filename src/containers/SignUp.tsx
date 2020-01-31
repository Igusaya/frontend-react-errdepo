import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';
import * as yup from 'yup';

import SignUp, { SignUpFormValue, SignUpProps } from 'components/SignUp';
import { signUp } from 'actions/signUp';
import { State } from 'reducers';

const Formik = withFormik<SignUpProps, SignUpFormValue>({
  mapPropsToValues: props => {
    return {
      inputUserName: '',
      inputEmail: '',
      inputPassword1: '',
      inputPassword2: ''
    };
  },
  handleSubmit: (payload, { props, resetForm, setSubmitting }) => {
    props.signUp({
      inputUserName: payload.inputUserName,
      inputEmail: payload.inputEmail,
      inputPassword1: payload.inputPassword1,
      inputPassword2: payload.inputPassword2
    });
    setSubmitting(false);
    resetForm();
  },
  validationSchema: yup.object().shape({
    inputUserName: yup
      .string()
      .max(30, 'nameは30文字以内で入力してください')
      .required('nameは必須です'),
    inputEmail: yup.string().email('形式がEmailではありません'),
    inputPassword1: yup
      .string()
      .min(6, 'passwordは6文字以上入力してください')
      .max(30, 'passwordは30文字寺内で入力してください')
      .required('passwordは必須です'),
    inputPassword2: yup
      .string()
      .oneOf([yup.ref('inputPassword1')], 're:passwordが一致しません')
      .required('re:passwordは必須です')
  })
})(SignUp);

interface DispatchProps {
  signUp: (signUpFormValues: SignUpFormValue) => void;
}

const mapStateToProps = (state: State) => {
  return {
    modalOpen: state.user.signUp.modalOpen,
    error: state.user.signUp.error || ''
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    signUp: signUpFormValues => dispatch(signUp.start(signUpFormValues))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Formik);
