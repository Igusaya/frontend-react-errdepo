import React from 'react';
import {
  CssBaseline,
  AppBar,
  Container,
  Toolbar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SignIn from 'signIn/container';
import SignUp from 'signUp/container';

const App: React.FC = () => {
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
    }
  }));

  const classes = useStyles();
  return (
    <>
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
            Todo Lists
          </Typography>
          <SignIn />
          <SignUp />
        </Toolbar>
      </AppBar>
      {/* body
       ***********************************************/}
      <Container>{localStorage.getItem('todolistsbackendkey')}</Container>
    </>
  );
};

export default App;
