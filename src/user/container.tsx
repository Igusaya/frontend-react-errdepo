import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import User from 'user/component';
import { user } from 'user/action';
import { State } from 'reducer';

interface DispatchProps {
  signOut: () => void;
}

const mapStateToProps = (state: State) => {
  return {
    //error: state.user.error
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    signOut: () => dispatch(user.start())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
