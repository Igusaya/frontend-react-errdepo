import React, { FC } from 'react';
import {
  Button,
  Modal,
  Fade,
  Backdrop,
  Card,
  CardActions,
  TextField
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { InjectedFormikProps } from 'formik';

/* Styles
 ***********************************************/
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      margin: theme.spacing(0.8, 1.2),
      textTransform: 'none'
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: {
      width: 230,
      padding: theme.spacing(1)
    },
    form: {
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      textTransform: 'none'
    }
  })
);

/* Props
 ***********************************************/
export interface SignInFormValue {
  inputUserName: string;
  inputPassword: string;
}
export interface SignInProps {
  signIn: (signInFromValue: SignInFormValue) => void;
  modalOpen: boolean;
}

/* Function component
 ***********************************************/
const Auth: FC<InjectedFormikProps<SignInProps, SignInFormValue>> = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleSignInOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Sign in button
       ***********************************************/}
      <Button
        color="primary"
        variant="outlined"
        className={classes.link}
        onClick={handleSignInOpen}
      >
        Sign in
      </Button>

      {/* Modal
       ***********************************************/}
      <Modal
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
        className={classes.modal}
        open={props.modalOpen ? !props.modalOpen : open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.modalOpen ? !props.modalOpen : open}>
          <Card className={classes.card}>
            <CardActions>
              <form onSubmit={props.handleSubmit}>
                {/* input user name
                 ***********************************************/}
                <TextField
                  id="inputUserName"
                  label="name"
                  className={classes.form}
                  fullWidth
                  required
                  value={props.values.inputUserName}
                  onChange={props.handleChange}
                  helperText={
                    props.touched.inputUserName && props.errors.inputUserName
                  }
                  error={
                    props.touched.inputUserName && props.errors.inputUserName
                      ? true
                      : false
                  }
                />
                {/* input password
                 ***********************************************/}
                <TextField
                  id="inputPassword"
                  label="password"
                  type="password"
                  className={classes.form}
                  fullWidth
                  required
                  value={props.values.inputPassword}
                  onChange={props.handleChange}
                  helperText={
                    props.touched.inputPassword && props.errors.inputPassword
                  }
                  error={
                    props.touched.inputPassword && props.errors.inputPassword
                      ? true
                      : false
                  }
                />
                {/* submit
                 ***********************************************/}
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className={classes.submit}
                  type="submit"
                >
                  Sign in
                </Button>
              </form>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </>
  );
};

export default Auth;
