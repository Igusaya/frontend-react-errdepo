import React from 'react';
import {
  CssBaseline,
  AppBar,
  Container,
  Toolbar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import SignIn from 'signIn/container';
import SignUp from 'signUp/container';
import User from 'user/container';
import { Profile } from 'service/backend-django-rest-errdepo/model';
import PostReport from 'postReport/container';

/* Props
 ***********************************************/
export interface AppProps {
  isSignIn: boolean;
  profile?: Profile;
}

/* Function component
 ***********************************************/
const App: React.FC<AppProps> = ({ isSignIn = false, profile }) => {
  const useStyles = makeStyles(theme => ({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbar: {
      flexWrap: 'wrap'
    },
    toolbarTitle: {
      flexGrow: 1
    },
    link: {
      margin: theme.spacing(0.8, 1.2)
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6)
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
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <Link to="/">エラデポ</Link>
            </Typography>
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
            <Route path="/post_report">
              <PostReport />
            </Route>
            <Route path="/"></Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default App;
