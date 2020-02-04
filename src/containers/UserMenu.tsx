import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withFormik } from 'formik';

import UserMenu, {
  UserMenuProps,
  UserMenuFormValue
} from 'components/UserMenu';
import {
  signOut,
  getProfile,
  putProfile,
  PutProfileParams,
  eraseReportDetail
} from 'actions/userMenu';
import { State } from 'reducers';

const Formik = withFormik<UserMenuProps, UserMenuFormValue>({
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
})(UserMenu);

interface DispatchProps {
  signOut: () => void;
  getProfile: () => void;
  putProfile: (param: PutProfileParams) => void;
  eraseReportDetail: () => void;
}

const mapStateToProps = (state: State) => {
  return {
    error: state.user.userMenu.error,
    profile: state.user.userMenu.profile
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    signOut: () => dispatch(signOut.start()),
    getProfile: () => dispatch(getProfile.start()),
    putProfile: param => dispatch(putProfile.start(param)),
    eraseReportDetail: () => dispatch(eraseReportDetail())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Formik);
