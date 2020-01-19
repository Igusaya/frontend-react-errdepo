import { connect } from 'react-redux';

import { State } from 'reducer';
import App, { AppProps } from 'app/component';

const mapStateToProps = (state: State): AppProps => {
  return {
    isSignIn: localStorage.getItem('todolistsbackendkey') ? true : false,
    profile: state.user.profile
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
