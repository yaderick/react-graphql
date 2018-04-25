import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ match }) => (<h1>public {match.url}</h1>);


Main.propTypes = {
  match: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default Main;
