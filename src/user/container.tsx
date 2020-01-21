import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';

import User, { UserProps, UserFormValue } from 'user/component';
import { signOut, getProfile, putProfile, PutProfileParams } from 'user/action';
import { State } from 'reducer';

const Formik = withFormik<UserProps, UserFormValue>({
  mapPropsToValues: props => {
    return {
      inputImage: props.profile?.image || ''
    };
  },
  handleSubmit: (payload, { props, setSubmitting }) => {
    if (props.profile !== undefined) {
      props.putProfile({
        profile: {
          ...props.profile,
          image: payload.inputImage
        }
      });
    }
  }
})(User);

interface DispatchProps {
  signOut: () => void;
  getProfile: () => void;
  putProfile: (param: PutProfileParams) => void;
}

const mapStateToProps = (state: State) => {
  return {
    error: state.user.error,
    profile: state.user.profile
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    signOut: () => dispatch(signOut.start()),
    getProfile: () => dispatch(getProfile.start()),
    putProfile: param => dispatch(putProfile.start(param))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Formik);
