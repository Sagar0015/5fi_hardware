import React, { Fragment, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch, } from 'react-redux';

import {
  AppBar,
  Toolbar,
  IconButton,
  // InputBase,
  Menu,
  MenuItem,
  Fab,
  Box,
  Divider,
  List,
  ListItem,
  Drawer,
  Container,
  Button,
  Hidden,
  // Link
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Person as AccountIcon,
  Send as SendIcon,
  Clear
} from "@material-ui/icons";
import classNames from "classnames";
import './header.scss';
import Logo from '../../images/app/5Fi_logo_white.svg';

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";

import * as authActions from '../../store/auth/auth.actions';
import { Auth } from "aws-amplify";

// context
// import {
//   useLayoutState,
//   useLayoutDispatch,
//   toggleSidebar,
// } from "../../context/LayoutContext";
// import { useUserDispatch, signOut } from "../../context/UserContext";

const messages = [
  {
    id: 0,
    variant: "warning",
    name: "Jane Hew",
    message: "Hey! How is it going?",
    time: "9:32",
  },
  {
    id: 1,
    variant: "success",
    name: "Lloyd Brown",
    message: "Check out my new Dashboard",
    time: "9:18",
  },
  {
    id: 2,
    variant: "primary",
    name: "Mark Winstein",
    message: "I want rearrange the appointment",
    time: "9:15",
  },
  {
    id: 3,
    variant: "secondary",
    name: "Liana Dutti",
    message: "Good news from sale department",
    time: "9:09",
  },
];

const notifications = [
  { id: 0, color: "warning", message: "Check out this awesome ticket" },
  {
    id: 1,
    color: "success",
    type: "info",
    message: "What is the best way to get ...",
  },
  {
    id: 2,
    color: "secondary",
    type: "notification",
    message: "This is just a simple notification",
  },
  {
    id: 3,
    color: "primary",
    type: "e-commerce",
    message: "12 new orders has arrived today",
  },
];

export default function Header({ ...props }) {
  var classes = useStyles();
  const router = useHistory()

  const authState = useSelector(state => state.auth);


  console.log(props, router);

  // global
  // var layoutState = useLayoutState();
  // var layoutDispatch = useLayoutDispatch();
  // var userDispatch = useUserDispatch();

  // local
  var [mailMenu, setMailMenu] = useState(null);
  // var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  // var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  // var [isSearchOpen, setSearchOpen] = useState(false);

  var [signUp, setSignUp] = useState(null);


  const dispatch = useDispatch()




  //   const handleSignUpSection = () => {
  //     var thisView = this;
  //     console.log("updatingLogin props: ", props);
  //     console.log("I am from signUp Component :");
  //     thisView.props.updatingLogin(true);
  // };

  const handleSignUpSection = useDispatch();
  const handleSignOut = async () => {
    dispatch(authActions.signoutStart(router))
    setProfileMenu(null)
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawerWidth = 840;

  const handleSignIn = async () => {
    router.push({ pathname: "/login" })

  }
  const handleSignUp = async () => {
    router.push({ pathname: "/deploy" })

  }

  return (
    <AppBar position="fixed" className="app-header">
      <Toolbar className={classes.toolbar}>
        {/* <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton> */}
        <Typography variant="h4" weight="medium" className={classes.logotype}>
          <NavLink to="/monitor" className={"app-name-header"}>
            <img src={Logo} className="app_logo_header" />
          </NavLink>
        </Typography>
        <div className={classes.grow} />

        <Box className={classes.navItems}>
          {!router.location.pathname.includes('show') ? <div className={"h-options"}>
            <NavLink to="/monitor"><span>Monitor Network</span></NavLink>
            <NavLink to="/manage"><span>Manage Network</span></NavLink>
            <NavLink to="/inspect"><span>Inspect</span></NavLink>

            {/* <NavLink to="/deploy"><span>Deploy</span></NavLink>
          <NavLink to="/monitor"><span>Monitor</span></NavLink>
          <NavLink to="/manage"><span>Manage</span></NavLink> */}
          </div>
            :
            <span className="header">Agri-Vision</span>
          }
        </Box>



        <div className={classes.grow} />
        {/* <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setMailMenu(e.currentTarget);
            setIsMailsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isMailsUnread ? messages.length : null}
            color="secondary"
          >
            <MailIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton> */}

        <Box className={classes.navItems}>

          {!authState.isAuthenticated && !router.location.pathname.includes('show') && <div className="sign-up-button" onClick={() => {
            handleSignUp()
          }}>Sign Up </div>}
        </Box>


        {authState.isAuthenticated && !router.location.pathname.includes('show') &&
          <IconButton
            aria-haspopup="true"
            color="inherit"
            className={classes.headerMenuButton}
            aria-controls="profile-menu"
            onClick={e => setProfileMenu(e.currentTarget)}
          >
            <AccountIcon classes={{ root: classes.headerIcon }} />
          </IconButton>}

        <Hidden mdUp>
          <IconButton
            aria-haspopup="true"
            color="inherit"
            className={classes.headerMenuButton}
            aria-controls="profile-menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon classes={{ root: classes.headerIcon }} />
          </IconButton>
        </Hidden>






        <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              New Messages
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="secondary"
            >
              {messages.length} New Messages
            </Typography>
          </div>
          {messages.map(message => (
            <MenuItem key={message.id} className={classes.messageNotification}>
              <div className={classes.messageNotificationSide}>
                <UserAvatar color={message.variant} name={message.name} />
                <Typography size="sm" color="text" colorBrightness="secondary">
                  {message.time}
                </Typography>
              </div>
              <div
                className={classNames(
                  classes.messageNotificationSide,
                  classes.messageNotificationBodySide,
                )}
              >
                <Typography weight="medium" gutterBottom>
                  {message.name}
                </Typography>
                <Typography color="text" colorBrightness="secondary">
                  {message.message}
                </Typography>
              </div>
            </MenuItem>
          ))}
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.sendMessageButton}
          >
            Send New Message
            <SendIcon className={classes.sendButtonIcon} />
          </Fab>
        </Menu>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          {authState.isAuthenticated &&

            <div className={classes.profileMenuUser}>
              <Typography variant="h4" weight="medium">
                {authState.currentUser.name}
              </Typography>
              <Typography
                className={classes.profileMenuLink}
                component="a"
                color="primary"
              >
                {authState.currentUser.email}
              </Typography>
            </div>
          }
          {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem> */}
          {!authState?.isAuthenticated
            ?
            <div onClick={handleSignIn} className={classes.profileMenuUser}>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
              // onClick={() => signOut(userDispatch, props.history)}
              >
                Sign In
              </Typography>
            </div>
            :
            <div onClick={handleSignOut} className={classes.profileMenuUser}>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
              // onClick={() => signOut(userDispatch, props.history)}
              >
                Sign Out
              </Typography>
            </div>}
        </Menu>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          anchor={"right"}
          onClose={handleDrawerToggle}

          sx={{
            display: { xs: 'block', sm: 'none', },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '600px' },
          }}
        >

          <Box className={classes.drawerComp}>
            <Container>
              <Box className={classes.clrIconWrapper}>

                <IconButton >
                  <Clear style={{ color: '#2c2c6e' }} fontSize="large" onClick={handleDrawerToggle} />
                </IconButton>
              </Box>

              {!router.location.pathname.includes('show') ?
                <Box className={classes.resMenuItems}>
                  <NavLink to="/monitor">
                    <Typography variant="h3">Monitor Network</Typography>
                  </NavLink>
                  <NavLink to="/manage">
                    <Typography variant="h3">Manage Network</Typography>
                  </NavLink>
                  <NavLink to="/inspect">
                    <Typography variant="h3">Inspect</Typography>
                  </NavLink>
                </Box>
                :
                <Box className={classes.resMenuItems}>
                  <Typography variant="h3">
                    Agri-Vision
                  </Typography>
                </Box>
              }

              <Box className={classes.resMenuFooter}>

                {!authState.isAuthenticated && !router.location.pathname.includes('show') && <Button
                  onClick={handleSignUp}
                  variant="contained" className={classes.signUpBtn}>
                  Sign Up
                </Button>}

              </Box>
            </Container>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}