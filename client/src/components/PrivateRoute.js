import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            ((authed || localStorage.getItem("token"))
                ? <Component {...props} />
                : <Redirect to="/login" />)
        }
    />
);

export default PrivateRoute;

/**
 *
import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const PrivateRoute=({component: Component, isAuthenticated, ...rest}) => {
    return (
        <Route
          {...rest}
          render={(props) => isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
      )
}

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component,auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
export default PrivateRoute;
 */