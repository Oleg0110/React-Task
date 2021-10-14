import React from "react";
import styles from "./Button.module.scss"

type ButtonStyleTypes = "mainButtonStyle" | "sidebarButtonStyle" | "thirdButtonStyle" | "fourthButtonStyle" | "fifthButtonStyle" | "userFieldButtonStyle"

interface IButtonProps {
  onClick?: (arg0: any) => void,
  buttonStyle?: string
}

const Button: React.FC<IButtonProps> = ({ children, onClick, buttonStyle }) => {
  return (
    <button className={!!buttonStyle ? styles[buttonStyle] : ''}
      onClick={onClick}>
      {children}
    </button >)
}

export default Button