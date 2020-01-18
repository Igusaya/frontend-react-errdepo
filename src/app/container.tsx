import { connect } from 'react-redux';

import { State } from 'reducer';
import App from 'app/component';

const mapStateToProps = (state: State) => {
  return {
    isSignIn: localStorage.getItem('todolistsbackendkey') ? true : false
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
