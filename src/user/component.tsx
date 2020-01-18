import React, { FC } from 'react';
import {
  Avatar,
  Menu,
  MenuProps,
  MenuItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';

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
  //putProfile: () => void;
}

/* Function component
 ***********************************************/
//const User: FC<UserProps> = ({ signOut }) => {
const User: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOutClick = () => {
    console.log('teste');
    // signOut();
  };
  return (
    <>
      <Avatar
        alt="Remy Sharp"
        src="http://localhost:8000/image/profIcon/defo.png"
        onClick={handleClick}
      />

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
