import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <>
      <button className="btn-load" type="button" onClick={onClick}>
        Load more
      </button>
    </>
  );
};
export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
