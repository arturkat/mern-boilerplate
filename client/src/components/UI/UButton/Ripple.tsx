import React, { useState, useLayoutEffect } from "react";
import { RippleContainer } from "./Ripple.styled";
import PropTypes from "prop-types";

const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
  useLayoutEffect(() => {
    let bounceId = null;
    if (rippleCount > 0) {
      clearTimeout(bounceId);

      bounceId = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounceId);
      }, duration * 2);
    }

    return () => clearTimeout(bounceId);
  }, [rippleCount, duration, cleanUpFunction]);
};

const adjustScale = value => value * 0.98

const Ripple = props => {
  const { duration, color } = props;
  const [rippleArray, setRippleArray] = useState([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple = event => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.clientX - rippleContainer.x - adjustScale(size / 2);
    const y = event.clientY - rippleContainer.y - adjustScale(size / 2);
    const newRipple = {
      x,
      y,
      size
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <RippleContainer duration={duration} color={color} onClick={addRipple}>
      {rippleArray.length > 0 &&
      rippleArray.map((ripple, index) => {
        return (
          <span
            key={"span" + index}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size
            }}
          />
        );
      })}
    </RippleContainer>
  );
};

Ripple.propTypes = {
  duration: PropTypes.number,
  color: PropTypes.string
};

Ripple.defaultProps = {
  duration: 850,
  color: "#fff"
};

export default Ripple
