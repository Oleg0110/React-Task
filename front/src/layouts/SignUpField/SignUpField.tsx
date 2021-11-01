import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  TITLE_VALIDATION,
} from '../../utils/validation'
import { Button, TextBox } from '../../components'
import { UserStore } from '../../stores'
import { ROUTES } from '../../utils/constants'
import styles from './SignUpField.module.scss'

interface IOnSubmitProps {
  email: string
  name: string
  password: string
}

const SignUpField: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const isAuth = !!UserStore.userToken

  useEffect(() => {
    if (isAuth) {
      history.push(ROUTES.home)
    } else {
      history.push(ROUTES.userAuthSignUp)
    }
  }, [isAuth, history])

  const [isPassword, setIsPassword] = useState('password')

  const onSubmit = (data: IOnSubmitProps) => {
    UserStore.registerUser(data.email, data.name, data.password)
  }

  return (
    <div className={styles.contentPosition}>
      <div className={styles.content}>
        <div className={styles.logoPosition}>
          <h1 className={styles.logo}>DILA</h1>
        </div>
        <h2 className={styles.title}>{t('signUp.title')}</h2>
        <form
          className={styles.infoAccountBlock}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextBox
            inputStyle='inputAuth'
            placeholder={t('signUp.emailPlaceholder')}
            type='email'
            label='email'
            register={register}
            error={errors?.email?.message}
            errorPosition='errorAuth'
            required={EMAIL_VALIDATION}
          />
          <TextBox
            inputStyle='inputAuth'
            placeholder={t('signUp.namePlaceholder')}
            type='text'
            label='name'
            register={register}
            error={errors?.name?.message}
            errorPosition='errorAuth'
            required={TITLE_VALIDATION}
          />
          <div className={styles.passwordField}>
            <TextBox
              inputStyle='inputAuth'
              placeholder={t('signUp.passwordPlaceholder')}
              type={isPassword}
              label='password'
              register={register}
              error={errors?.password?.message}
              errorPosition='errorAuth'
              required={PASSWORD_VALIDATION}
            />
          </div>
          <div className={styles.buttonPosition}>
            <Button buttonStyle='fifthButtonStyle'>
              <span className={styles.buttonName}>{t('signUp.signUp')}</span>
            </Button>
          </div>
        </form>
        <Button
          onClick={() => {
            setIsPassword(isPassword === 'password' ? 'text' : 'password')
          }}
        >
          <div className={`${styles.type} ${styles[`type-${isPassword}`]}`} />
        </Button>
        <p className={styles.attention}>
          {t('signUp.by')}
          <span className={styles.ourTerms}>{t('signUp.terms')}</span>
          {t('signUp.and')}
          <span className={styles.ourTerms}>{t('signUp.policy')}</span>
        </p>
      </div>
      <div className={styles.changeField}>
        <p className={styles.changeSign}>
          {t('signUp.have')}
          <Button onClick={() => history.push(ROUTES.userAauthLogIn)}>
            <span className={styles.buttonStyle}>{t('signUp.logIn')}</span>
          </Button>
        </p>
      </div>
    </div>
  )
}

export default observer(SignUpField)
