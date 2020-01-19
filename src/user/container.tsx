import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import User from 'user/component';
import { signOut, getProfile } from 'user/action';
import { State } from 'reducer';

interface DispatchProps {
  signOut: () => void;
  getProfile: () => void;
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
    getProfile: () => dispatch(getProfile.start())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
