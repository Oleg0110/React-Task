import React from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import styles from './TextBox.module.scss'

interface IFormValues {
  title?: string
  password?: string
  email?: string
  name?: string
  text?: string
  content?: string
  manager?: string
}

type IStyleType =
  | 'inputCreate'
  | 'inputCreateProject'
  | 'inputAuth'
  | 'textInput'
  | 'changeProjectContent'
  | 'createProjectContent'
  | 'inputSearchUser'

type IErrorType =
  | 'changeContenterror'
  | 'errorTitlePosition'
  | 'errorContentPosition'
  | 'errorAuth'

interface ITextBoxProps {
  inputStyle?: IStyleType
  errorPosition?: IErrorType
  error?: string
  placeholder?: string
  type?: string
  register: UseFormRegister<IFormValues>
  required?: object
  label: Path<IFormValues>
  defaultValue?: string
  autoComplete?: 'off'
  pattern?: string
  disabled?: boolean
}

const TextBox = ({
  inputStyle,
  errorPosition,
  error,
  placeholder,
  type,
  register,
  required,
  label,
  defaultValue,
  autoComplete,
  pattern,
  disabled,
}: ITextBoxProps) => (
  <>
    {(!!type && (
      <input
        {...register(label, required)}
        className={inputStyle && styles[inputStyle]}
        placeholder={placeholder}
        defaultValue={defaultValue}
        type={type}
        autoComplete={autoComplete}
        pattern={pattern}
        disabled={disabled}
      />
    )) || (
      <textarea
        {...register(label, required)}
        placeholder={placeholder}
        className={inputStyle && styles[inputStyle]}
      />
    )}
    {error && <p className={errorPosition && styles[errorPosition]}>{error}</p>}
  </>
)

TextBox.displayName = 'TextBox'

export default TextBox
