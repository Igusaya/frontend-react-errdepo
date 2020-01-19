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
import User from 'user/container';
import { Profile } from 'service/backend-django-rest-todolists/model';

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
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h4"
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          ご覧いただき、誠にありがとうございます
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          component="p"
          className={classes.text}
        >
          {
            '当サイトはポートフォリオです。\n保存頂いたデータは予告なく削除する場合がございます。予めご了承ください。'
          }
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          component="p"
          className={classes.text}
        >
          {
            '\n動作確認には以下のユーザー情報をご利用ください。\nuser:user\npass:hogefuga'
          }
        </Typography>
      </Container>
    </>
  );
};

export default App;
