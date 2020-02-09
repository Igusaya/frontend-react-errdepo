import React from 'react';
import { CssBaseline, AppBar, Container, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import User from 'containers/UserMenu';
import { Profile } from 'service/backend-django-rest-errdepo/model';
import MakeReport from 'containers/MakeReport';
import ViewReportList from 'containers/ReportList';
import ReportDetail from 'containers/ReportDetail';

/* Props
 ***********************************************/
export interface AppProps {
  isSignIn: boolean;
  hasReportId: boolean;
  profile?: Profile;
}

/* Function component
 ***********************************************/
const App: React.FC<AppProps> = ({
  isSignIn = false,
  profile,
  hasReportId = false
}) => {
  const useStyles = makeStyles(theme => ({
    appBar: {
      borderBottom: '8px solid #847f7d',
      backgroundColor: '#7EC2C2',
      '& a': {
        textDecoration: 'none',
        color: '#fff',
        fontSize: '1.8em'
      }
    },
    toolbar: {
      flexWrap: 'wrap',
      paddingLeft: '12px'
    },
    toolbarTitle: {
      flexGrow: 1
    },
    link: {
      margin: theme.spacing(0.8, 1.2)
    },
    heroContent: {
      padding: theme.spacing(4, 0, 6)
    },
    text: {
      whiteSpace: 'pre-line'
    }
  }));

  const classes = useStyles();
  return (
    <>
      <Router>
        <CssBaseline />
        {/* header
         ***********************************************/}
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <div className={classes.toolbarTitle}>
              <Link to="/report">
                <img
                  src={`${process.env.PUBLIC_URL}/logo.png`}
                  alt="Logo"
                  className={classes.toolbarTitle}
                />
              </Link>
            </div>
            {isSignIn ? (
              <div>
                <User />
              </div>
            ) : (
              <div>
                <SignIn />
                <SignUp />
              </div>
            )}
          </Toolbar>
        </AppBar>
        {/* body
         ***********************************************/}
        <Container
          maxWidth="md"
          component="main"
          className={classes.heroContent}
        >
          <Switch>
            <Route exact path="/">
              <ViewReportList />
            </Route>
            <Route path="/post_report">
              <MakeReport />
            </Route>
            <Route path="/put_report">
              {hasReportId ? (
                <MakeReport />
              ) : (
                <Redirect to={{ pathname: '/' }} />
              )}
            </Route>
            <Route path="/report/detail">
              {hasReportId ? (
                <ReportDetail />
              ) : (
                <Redirect to={{ pathname: '/' }} />
              )}
            </Route>
            <Route path="/report/:reportId">
              <ReportDetail />
            </Route>
            <Route path="*">
              <Redirect to={{ pathname: '/' }} />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default App;
