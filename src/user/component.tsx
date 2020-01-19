import React, { FC } from 'react';
import {
  Avatar,
  Menu,
  MenuProps,
  MenuItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Button
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';
import { Profile } from 'service/backend-django-rest-todolists/model';

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

/* Props
 ***********************************************/
export interface UserProps {
  //modalOpen: boolean;
  signOut: () => void;
  getProfile: () => void;
  //putProfile: () => void;
  profile?: Profile;
}

/* Function component
 ***********************************************/
const User: FC<UserProps> = ({ signOut, getProfile, profile }) => {
  if (
    profile === undefined &&
    localStorage.getItem('todolistsbackendkey') !== null
  ) {
    getProfile();
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOutClick = () => {
    signOut();
  };
  let imageURL: string | undefined = undefined;
  if (
    process.env.REACT_APP_BACKEND_URL !== undefined &&
    profile?.image !== undefined
  ) {
    imageURL = process.env.REACT_APP_BACKEND_URL.slice(0, -1) + profile.image;
  }

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<Avatar alt={profile?.username} src={imageURL} />}
      >
        <div>{profile?.username}</div>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <CreateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleSignOutClick}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};

export default User;
