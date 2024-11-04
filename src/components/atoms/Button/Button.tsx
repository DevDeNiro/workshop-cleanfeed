import React, { useRef } from "react";
import { StyledButton } from "@atoms/Button/Button.styled.tsx";

export interface ButtonProps {
  handleClick: () => void;
  children: React.ReactNode;
  hasPopup?: boolean;
  expanded?: boolean;
  logout?: boolean;
  label?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  handleClick,
  children,
  hasPopup,
  expanded,
  logout,
  style,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <StyledButton
      aria-haspopup={hasPopup}
      aria-expanded={expanded}
      ref={buttonRef}
      onClick={handleClick}
      className={logout ? "danger" : "secondary"}
      style={style}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
