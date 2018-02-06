
import React from 'react';
import PropTypes from 'prop-types';


class Icon extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return <i className={`fa${this.props.type} fa-${this.props.loading ? 'circle-notch fa-spin' : this.props.icon}${this.props.fixedWidth ? ' fa-fw' : ''}`} />;
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
  fixedWidth: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string,
};

Icon.defaultProps = {
  fixedWidth: false,
  loading: false,
  type: 'r',
};

export default Icon;
