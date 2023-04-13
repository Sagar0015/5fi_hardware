import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({
  auth: { isAuthenticated, loading },
  component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated && !loading) {
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        }

        return (
          React.createElement(component, props)
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PublicRoute);