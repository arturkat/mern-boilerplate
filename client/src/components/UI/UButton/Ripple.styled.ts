import styled from "styled-components";

export const RippleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  span {
    position: absolute;
    border-radius: 100%;
    background-color: ${props => props.color};
    animation-name: ripple;
    animation-duration: ${props => props.duration}ms;
    opacity: 0.5;
    transform: scale(0);
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(3);
    }
  }
`;
