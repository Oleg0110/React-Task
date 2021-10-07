import React from "react";
import styles from "./Button.module.scss"

interface IButton {
   onClick?: (e: React.MouseEvent<HTMLElement>) => void,
   buttonStyle?: string
}

const Button: React.FC<IButton> = ({ children, buttonStyle, onClick }) => {
   return (
      <button
         className={!!buttonStyle ? styles[buttonStyle] : ''}
         onClick={onClick}>{children}
      </button >)
}

export default Button