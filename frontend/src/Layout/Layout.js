import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import classnames from "classnames";
import { Box, Link } from '@material-ui/core'
// import Icon from '@mdi/react'

//icons
// import {
//   mdiFacebook as FacebookIcon,
//   mdiTwitter as TwitterIcon,
//   mdiGithub as GithubIcon,
// } from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../components/Header/Header";
// import Sidebar from "../Sidebar";

// pages
// import DeployNetwork from '../pages/deployNetwork';

import StepperCoreFlow from '../pages/stepperCoreFlow';
import Monitor from '../pages/monitor';
import Manage from "../pages/manage";
import Inspect from "../pages/inspect";

import Dashboard from "../pages/dashboard/Dashboard";
import Typography from "../pages/typography/Typography";
import Notifications from "../pages/notifications/Notifications";
import Maps from "../pages/maps/Maps";
import Tables from "../pages/tables/Tables";
import Icons from "../pages/icons/Icons";
import Charts from "../pages/charts/Charts";
import StepperAddAP from "../pages/stepperAddAP";
import LoginForm from "../pages/loginForm";
import HomeView from "../pages/HomeView";

import AddAccessPoint from "../pages/addAP/addAP";
import ShowOutput from "../pages/showOutput/showOutput";
import { useDispatch, useSelector } from "react-redux";

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Device from "../pages/device";
import AddDevice from "../pages/addDevice";



// context
// import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  // var layoutState = useLayoutState();
  const authState = useSelector(state => state.auth);

  const router = useHistory()

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (authState.currentUser) {
      router.push('/monitor')

    }
  }, [])





  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} {...props} />
        {/* <Sidebar /> */}
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: false, //layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/show" component={(currProps) => { return <ShowOutput {...props} {...currProps} /> }} />
            <PublicRoute path="/login" component={(currProps) => { return <LoginForm {...props} {...currProps} /> }} />
            <PublicRoute path="/home" component={(currProps) => { return <HomeView {...props} {...currProps} /> }} />
            <PrivateRoute path="/quick-AP" component={(currProps) => { return <AddAccessPoint {...props} {...currProps} /> }} />
            <PrivateRoute path="/monitor" component={(currProps) => { return <Monitor {...props} {...currProps} /> }} />
            <PrivateRoute path="/device" component={(currProps) => { return <Device {...props} {...currProps} /> }} />
            <PrivateRoute path="/device-add" component={(currProps) => { return <AddDevice {...props} {...currProps} /> }} />
            <Route path="/deploy" component={(currProps) => { return <StepperCoreFlow {...props} {...currProps} /> }} />
            <PrivateRoute path="/add-ap" component={(currProps) => { return <StepperAddAP {...props} {...currProps} /> }} />

            {/* <Route path="/monitor" component={(currProps) => {  return <Monitor {...props} {...currProps}/>} } /> */}
            <PrivateRoute
              path="/manage"
              component={(currProps) => { return <Manage {...props} {...currProps} /> }}
            />
            <PrivateRoute
              path="/inspect"
              component={(currProps) => { return <Inspect {...props} {...currProps} /> }}
            />


            <Route path="/home" component={Dashboard} />
            <Route path="/typography" component={Typography} />
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/notifications" component={Notifications} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <div>
              {/* <Link
                  color={'primary'}
                  href={'https://5g.dolcera.com'}
                  target={'_blank'}
                  className={classes.link}
                >
                  © 2020 Dolcera - All Rights Reserved.
                </Link>
                <Link
                  color={'primary'}
                  href={'https://5g.dolcera.com/index.php/'}
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link> */}
            </div>
            <div>
              <Link
                color={'primary'}
                href={'https://5g.dolcera.com'}
                target={'_blank'}
                className={classes.link}
              >
                © 2021 Dolcera - All Rights Reserved.
              </Link>
              <Link
                color={'primary'}
                href={'https://5g.dolcera.com/index.php/'}
                target={'_blank'}
                className={classes.link}
              >
                About Us
              </Link>
              {/* <Link
                  href={'https://www.facebook.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://twitter.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="twitter">
                    <Icon
                      path={TwitterIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://github.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link> */}
            </div>
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
