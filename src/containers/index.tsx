import { connect } from 'react-redux';

import { State } from 'reducers';
import App, { AppProps } from 'components';

const mapStateToProps = (state: State): AppProps => {
  const hasReportId: boolean =
    state.report.reportId !== undefined && state.report.reportId > 0;
  return {
    isSignIn: localStorage.getItem('todolistsbackendkey') ? true : false,
    profile: state.user.userMenu.profile,
    hasReportId: hasReportId
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
