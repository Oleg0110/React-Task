import React, { forwardRef } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import styles from './Button.module.scss'

type ButtonStyleTypes =
  | 'mainButtonStyle'
  | 'sidebarButtonStyle'
  | 'thirdButtonStyle'
  | 'fourthButtonStyle'
  | 'fifthButtonStyle'
  | 'userFieldButtonStyle'

interface IButtonProps {
  onClick?: (arg0: any) => void
  onSubmit?: (arg0: any) => void
  buttonStyle?: ButtonStyleTypes
  tooltipContent?: string
}

const Button: React.FC<IButtonProps> = forwardRef(
  ({ children, onClick, buttonStyle, onSubmit, tooltipContent }, ref) => (
    <>
      {(!!tooltipContent && (
        <Tippy content={tooltipContent}>
          <button
            type='submit'
            className={buttonStyle && styles[buttonStyle]}
            onClick={onClick}
            onSubmit={onSubmit}
          >
            {children}
          </button>
        </Tippy>
      )) || (
        <button
          type='submit'
          className={buttonStyle && styles[buttonStyle]}
          onClick={onClick}
          onSubmit={onSubmit}
        >
          {children}
        </button>
      )}
    </>
  ),
)

Button.displayName = 'Button'

export default Button
