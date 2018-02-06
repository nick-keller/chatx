import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon/index';

const Container = styled.div`
  position: absolute;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #4468B0;
  color: white;
  text-align: center;
  line-height: 100vh;
  font-size: 5em;
`;

/**
 * A simple full screen spinner
 */
function LoadingScreen() {
  return (
    <Container>
      <Icon loading type="s" />
    </Container>
  );
}

export default LoadingScreen;
