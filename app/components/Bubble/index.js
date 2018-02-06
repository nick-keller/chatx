import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BubbleContainer = styled.div`
  background: #F1F0F0;
  border-radius: 18px;
  padding: 6px 12px;
  margin: 1px 0;
  max-width: 95%;
  line-height: 17px;
  display: inline-block;
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
  
  .me & {
    background: #1787FB;
    color: white;
    border-bottom-left-radius: 18px;
    border-top-left-radius: 18px;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
  }
  
  div:first-child > & {
    border-top-left-radius: 18px;
  }
  
  div:last-child > & {
    border-bottom-left-radius: 18px;
  }
  
  .me div:first-child > & {
    border-top-right-radius: 18px;
  }
  
  .me div:last-child > & {
    border-bottom-right-radius: 18px;
  }
`;

function Bubble(props) {
  return (
    <div>
      <BubbleContainer>
        {props.message}
      </BubbleContainer>
    </div>
  );
}

Bubble.propTypes = {
  message: PropTypes.string,
};

export default Bubble;
