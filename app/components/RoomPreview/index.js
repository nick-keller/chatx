
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Preview = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #404040;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  overflow: hidden;
  
  div {
    width: 50%;
    height: 50%;
    background-size: cover;
    display: inline-block;
    box-shadow: -1px -1px 0 white;
  }
  
  div:only-child {
    width: 100%;
    height: 100%;
  }
  
  div:first-child:nth-last-child(2),
  div:first-child:nth-last-child(2) ~ div {
    height: 100%;
}
`;

function RoomPreview(props) {
  return (
    <Preview>
      { props.photosURL.map((url, id) => <div key={id} style={{ backgroundImage: `url(${url})` }} />) }
    </Preview>
  );
}

RoomPreview.propTypes = {
  photosURL: PropTypes.array,
};

export default RoomPreview;
