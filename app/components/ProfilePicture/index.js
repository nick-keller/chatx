import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Photo = styled.div`
  width: 29px;
  height: 29px;
  border-radius: 100%;
  background: #4e4e4e;
  position: absolute;
  left: 12px;
  bottom: 11px;
  background-size: cover;
  
  .me & {
    right: 12px;
    left: auto;
  }
`;

function ProfilePicture(props) {
  return (
    <Photo style={{ backgroundImage: `url(${props.url})` }} />
  );
}

ProfilePicture.propTypes = {
  url: PropTypes.string,
};

export default ProfilePicture;
