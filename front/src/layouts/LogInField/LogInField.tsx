import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../utils/validation'
import { Button, TextBox } from '../../components'
import { ROUTES } from '../../utils/constants'
import useStore from '../../hooks/useStore'
import styles from './LogInField.module.scss'

interface IOnSubmitProps {
  email: string
  password: string
}

const LogInField: React.FC = () => {
  const { userStore } = useStore()
  const { userToken, loginUser } = userStore

  const { t } = useTranslation()
  const history = useHistory()

  const isAuth = !!userToken

  useEffect(() => {
    isAuth ? history.push(ROUTES.home) : history.push(ROUTES.userAauthLogIn)
  }, [isAuth, history])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [isPassword, setIsPassword] = useState('password')

  const onSubmit = (data: IOnSubmitProps) => {
    loginUser(data.email, data.password)
  }

  return (
    <div className={styles.contentPosition}>
      <div className={styles.content}>
        <div className={styles.logoPosition}>
          <h1 className={styles.logo}>DILA</h1>
        </div>
        <form
          className={styles.infoAccountBlock}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextBox
            inputStyle='inputAuth'
            placeholder={t('logIn.emailPlaceholder')}
            type='email'
            label='email'
            register={register}
            error={errors?.email?.message}
            errorPosition='errorAuth'
            required={EMAIL_VALIDATION}
          />
          <TextBox
            inputStyle='inputAuth'
            placeholder={t('logIn.passwordPlaceholder')}
            type={isPassword}
            label='password'
            register={register}
            error={errors?.password?.message}
            errorPosition='errorAuth'
            required={PASSWORD_VALIDATION}
          />
          <div className={styles.buttonPosition}>
            <Button buttonStyle='fifthButtonStyle'>
              <span className={styles.buttonName}>{t('logIn.logIn')}</span>
            </Button>
          </div>
          <div className={styles.or}>
            <div className={styles.orLine} />
            <span className={styles.orWord}>{t('logIn.or')}</span>
            <div className={styles.orLine} />
          </div>
        </form>
        <Button
          onClick={() => {
            setIsPassword(isPassword === 'password' ? 'text' : 'password')
          }}
        >
          <div className={`${styles.type} ${styles[`type-${isPassword}`]}`} />
        </Button>
        <Button>
          <p className={styles.forgot}>{t('logIn.forgot')}</p>
        </Button>
      </div>
      <div className={styles.changeField}>
        <p className={styles.changeSign}>
          {t('logIn.doNot')}
          <Button onClick={() => history.push(ROUTES.userAuthSignUp)}>
            <span className={styles.buttonStyle}>{t('logIn.signUp')}</span>
          </Button>
        </p>
      </div>
    </div>
  )
}

export default observer(LogInField)
