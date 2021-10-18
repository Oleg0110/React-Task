import React from 'react'
import styles from './TextBox.module.scss'

interface ITextBoxProps {
  inputStyle?: string
  error?: string
  placeholder?: string
  innerRef?: string
  type?: string
}

const TextBox: React.FC<ITextBoxProps> = ({
  inputStyle,
  error,
  innerRef,
  placeholder,
  type,
}) => (
  <div>
    <input
      className={inputStyle ? styles[inputStyle] : ''}
      ref={innerRef}
      placeholder={placeholder}
      type={type}
    />
    {error && <p className={styles.errorPosition}>{error}</p>}
  </div>
)

export default TextBox
