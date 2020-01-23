import React, { FC, useEffect } from 'react';
import {
  Avatar,
  Menu,
  MenuProps,
  MenuItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Button,
  Modal,
  Fade,
  Backdrop,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Fab
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import { InjectedFormikProps } from 'formik';
import NavigationIcon from '@material-ui/icons/Navigation';

import { Profile } from 'service/backend-django-rest-todolists/model';
import { PutProfileParams } from './action';

/* Styles
 ***********************************************/
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: 300,
      padding: theme.spacing(1)
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    media: {
      height: 300,
      position: 'relative'
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(1),
      right: theme.spacing(1),
      opacity: 0.7
    },
    input_file: {
      opacity: 0,
      appearance: 'none',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      position: 'absolute'
    },
    margin: {
      margin: theme.spacing(1)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    card_action: {
      height: 70,
      position: 'relative'
    },
    fab_put: {
      position: 'absolute',
      left: 0,
      right: 0,
      margin: 'auto',
      width: '110px',
      height: '34px',
      padding: theme.spacing(0, 1),
      minWidth: '34px',
      borderRadius: '17px'
    }
  })
);

/* Props
 ***********************************************/
export interface UserProps {
  signOut: () => void;
  getProfile: () => void;
  putProfile: (params: PutProfileParams) => void;
  profile?: Profile;
}

export interface UserFormValue {
  inputImage: string;
}

/* Function component
 ***********************************************/
const User: FC<InjectedFormikProps<UserProps, UserFormValue>> = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [profImage, setProfImage] = React.useState<string>('');
  const [errMessage, setErrMessage] = React.useState<string>('');
  const classes = useStyles();

  // get profile
  if (
    props.profile === undefined &&
    localStorage.getItem('todolistsbackendkey') !== null
  ) {
    props.getProfile();
  }

  // handle methods
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOutClick = () => {
    props.signOut();
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const setImage = (e: any, value: any) => {
    if (!e.target.files[0].type.match(/image.*/)) {
      setErrMessage('画像を選択してください');
      return;
    }
    setErrMessage('');
    let canvas = document.getElementById('canvas');
    if (!(canvas instanceof HTMLCanvasElement) || null === canvas) {
      throw new Error('is not HTMLCanvasElement');
    }
    let ctx = canvas.getContext('2d');
    let maxW = 200;
    let maxH = 200;

    let img = new Image();
    img.onload = () => {
      let iw = img.width;
      let ih = img.height;
      let scale = Math.min(maxW / iw, maxH / ih);
      let iwScaled = iw * scale;
      let ihScaled = ih * scale;
      if (
        !(canvas instanceof HTMLCanvasElement) ||
        null === canvas ||
        null === ctx
      ) {
        throw new Error('is not HTMLCanvasElement');
      }
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
      const resizeData = canvas.toDataURL('image/png', 0.5);
      setProfImage(resizeData);
      props.setFieldValue('inputImage', resizeData);
    };
    img.src = URL.createObjectURL(e.target.files[0]);
  };

  // get profile image
  let imageURL: string | undefined = undefined;
  if (
    process.env.REACT_APP_BACKEND_URL !== undefined &&
    props.profile?.image !== undefined
  ) {
    imageURL =
      process.env.REACT_APP_BACKEND_URL.slice(0, -1) + props.profile.image;
  }

  useEffect(() => {
    setModalOpen(false);
    // eslint-disable-next-line
  }, [props.profile]);

  /* Return
   ***********************************************/
  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<Avatar alt={props.profile?.username} src={imageURL} />}
        data-testid="user-button"
      >
        <div>{props.profile?.username}</div>
      </Button>

      {/* User Menu
       ***********************************************/}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleModalOpen}>
          <ListItemIcon>
            <CreateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={handleSignOutClick}
          data-testid="sign-out-button"
        >
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </StyledMenuItem>
      </StyledMenu>

      {/* Profile
       ***********************************************/}
      <Modal
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={modalOpen}>
          <Card className={classes.card}>
            <form onSubmit={props.handleSubmit}>
              <CardContent>
                <Typography>Profile</Typography>
              </CardContent>
              <CardMedia
                className={classes.media}
                image={profImage ? profImage : imageURL}
                title="profile"
                id="inputTest"
              >
                <Fab
                  className={classes.fab}
                  color="secondary"
                  aria-label="edit"
                >
                  <EditIcon />
                  <input
                    className={classes.input_file}
                    type="file"
                    onChange={e => setImage(e, props.values)}
                  />
                </Fab>
              </CardMedia>
              <Typography>{errMessage}</Typography>
              <CardActions className={classes.card_action}>
                <Fab
                  className={classes.fab_put}
                  variant="extended"
                  color="primary"
                  aria-label="add"
                  type="submit"
                  disabled={props.values.inputImage ? false : true}
                >
                  <NavigationIcon className={classes.extendedIcon} />
                  UPLOAD
                </Fab>
                <canvas
                  id="canvas"
                  style={{
                    display: 'none'
                  }}
                  width="64"
                  height="64"
                />
              </CardActions>
            </form>
          </Card>
        </Fade>
      </Modal>
    </>
  );
};

export default User;
