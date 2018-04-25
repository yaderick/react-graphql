import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WithAuth = ({
  component: Component, location, isAuthenticated, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated ?
        <Component {...props} /> :
        <Redirect to={{
          pathname: '/login',
          state: { from: location.pathname },
        }}
        />
    )}
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
});

WithAuth.propTypes = {
  location: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WithAuth);
