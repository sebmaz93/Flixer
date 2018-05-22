import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import SpinnerWraper from "./SpinnerWrapper";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <SpinnerWraper component={Component} {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
});
export default connect(mapStateToProps)(PrivateRoute);
