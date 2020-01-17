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
export interface SignUpFormValue {
  inputUserName: string;
  inputEmail: string;
  inputPassword1: string;
  inputPassword2: string;
}
export interface SignUpProps {
  signUp: (signUpFormValue: SignUpFormValue) => void;
  modalOpen: boolean;
}

/* Function component
 ***********************************************/
const Auth: FC<InjectedFormikProps<SignUpProps, SignUpFormValue>> = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleSignUpOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* Sign up button
       ***********************************************/}
      <Button
        color="primary"
        variant="outlined"
        className={classes.link}
        onClick={handleSignUpOpen}
      >
        Sign up
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
                {/* input Email
                 ***********************************************/}
                <TextField
                  id="inputEmail"
                  label="email"
                  className={classes.form}
                  fullWidth
                  value={props.values.inputEmail}
                  onChange={props.handleChange}
                  helperText={
                    props.touched.inputEmail && props.errors.inputEmail
                  }
                  error={
                    props.touched.inputEmail && props.errors.inputEmail
                      ? true
                      : false
                  }
                />
                {/* input password 1
                 ***********************************************/}
                <TextField
                  id="inputPassword1"
                  label="password"
                  type="password"
                  className={classes.form}
                  fullWidth
                  required
                  value={props.values.inputPassword1}
                  onChange={props.handleChange}
                  helperText={
                    props.touched.inputPassword1 && props.errors.inputPassword1
                  }
                  error={
                    props.touched.inputPassword1 && props.errors.inputPassword1
                      ? true
                      : false
                  }
                />
                {/* input password 2
                 ***********************************************/}
                <TextField
                  id="inputPassword2"
                  label="re:password"
                  type="password"
                  className={classes.form}
                  fullWidth
                  required
                  value={props.values.inputPassword2}
                  onChange={props.handleChange}
                  helperText={
                    props.touched.inputPassword2 && props.errors.inputPassword2
                  }
                  error={
                    props.touched.inputPassword2 && props.errors.inputPassword2
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
                  Sign up
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
