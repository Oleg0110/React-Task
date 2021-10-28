import React from 'react'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { TextBox } from '..'
import { UserStore } from '../../stores'
import urlValue from '../../utils/functions'
import { NO_EMPTY_VALIDATION } from '../../utils/validation'
import styles from './UserSearch.module.scss'

interface IOnSubmitProps {
  text: string
}

interface IUserSearchProps {
  onSubmit: (data: IOnSubmitProps) => void
}

const UserSearch: React.FC<IUserSearchProps> = ({ onSubmit }) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <>
      <form onChange={handleSubmit(onSubmit)}>
        <TextBox
          inputStyle='inputSearchUser'
          placeholder={t('manageProject.palceholder')}
          type='text'
          label='text'
          register={register}
          error={errors.text?.message}
          errorPosition='errorTitlePosition'
          required={NO_EMPTY_VALIDATION}
          autoComplete='off'
        />
      </form>
    </>
  )
}

export default observer(UserSearch)
