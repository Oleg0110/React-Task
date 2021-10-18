import React from 'react'
import styles from './Button.module.scss'

// type ButtonStyleTypes =
//   | 'mainButtonStyle'
//   | 'sidebarButtonStyle'
//   | 'thirdButtonStyle'
//   | 'fourthButtonStyle'
//   | 'fifthButtonStyle'
//   | 'userFieldButtonStyle'

interface IButtonProps {
  onClick?: (arg0: any) => void
  onSubmit?: (arg0: any) => void
  buttonStyle?: string
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  buttonStyle,
  onSubmit,
}) => (
  <button
    type='button'
    className={!!buttonStyle ? styles[buttonStyle] : ''}
    onClick={onClick}
    onSubmit={onSubmit}
  >
    {children}
  </button>
)

export default Button
