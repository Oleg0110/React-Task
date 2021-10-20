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
}

type IStyleType =
  | 'inputCreate'
  | 'inputCreateProject'
  | 'inputAuth'
  | 'textInput'
  | 'changeProjectContent'
  | 'createProjectContent'

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
}: ITextBoxProps) => (
  <>
    {(!!type && (
      <input
        {...register(label, required)}
        className={!!inputStyle ? styles[inputStyle] : ''}
        placeholder={placeholder}
        defaultValue={defaultValue}
        type={type}
      />
    )) || (
      <textarea
        {...register(label, required)}
        placeholder={placeholder}
        className={!!inputStyle ? styles[inputStyle] : ''}
      />
    )}
    {error && (
      <p className={!!errorPosition ? styles[errorPosition] : ''}>{error}</p>
    )}
  </>
)

TextBox.displayName = 'TextBox'

export default TextBox
