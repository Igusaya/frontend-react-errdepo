import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ViewReport from 'viewReport/component';
import { State } from 'reducers';

const mapStateToProps = (state: State) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewReport);
