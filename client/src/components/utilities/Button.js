import React, { useState } from "react";
import "./button.scss";

const STYLES = ["btn-primary", "btn-outline"];
const SIZES = [
  "btn-small",
  "btn-medium",
  "btn-large",
  "btn-mobile",
  "btn-wide",
];

const COLOR = ["primary", "blue", "gradient"];

const Button = ({
  children,
  type,
  onClick,
  buttonSize,
  buttonStyle,
  buttonColor,
  style,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : COLOR[0];
  console.log(checkButtonColor);
  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
