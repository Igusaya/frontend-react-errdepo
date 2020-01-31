import { connect } from 'react-redux';

import { State } from 'reducers';
import App, { AppProps } from 'components';

const mapStateToProps = (state: State): AppProps => {
  return {
    isSignIn: localStorage.getItem('todolistsbackendkey') ? true : false,
    profile: state.user.userMenu.profile
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
