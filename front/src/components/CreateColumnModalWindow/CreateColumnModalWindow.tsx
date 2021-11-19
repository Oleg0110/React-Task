import React from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import urlValue from '../../utils/functions'
import { TITLE_VALIDATION } from '../../utils/validation'
import { Button, TextBox } from '..'
import useStore from '../../hooks/useStore'
import styles from './CreateColumnModalWindow.module.scss'

interface ICreateColumnModalWindowProps {
  isModalOpened: boolean
  setIsModalOpened: (boolean: boolean) => void
}

interface IOnSubmitProps {
  title: string
}

const CreateColumnModalWindow: React.FC<ICreateColumnModalWindowProps> = ({
  isModalOpened,
  setIsModalOpened,
}) => {
  const { boardStore } = useStore()
  const { pushColumn } = boardStore

  const history = useHistory()

  const { projectId } = urlValue(history.location.pathname)

  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: IOnSubmitProps) => {
    pushColumn(data.title, projectId)
    setIsModalOpened(false)
  }

  return (
    <>
      <button
        type='button'
        className={`${styles.backFon} ${isModalOpened && styles.opened}`}
        onClick={() => setIsModalOpened(false)}
        aria-label='Open Modal Window'
      />
      <div
        className={`${styles.createArea} ${
          isModalOpened && styles.openedCreate
        }`}
      >
        <div className={styles.modalBody}>
          <div className={styles.closeIconPosition}>
            <Button onClick={() => setIsModalOpened(false)}>
              <div className={styles.closeIcon} />
            </Button>
          </div>
          <span className={styles.title}>{t('modal.columnTitle')}</span>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* <input
              {...register('title', TITLE_VALIDATION)}
              type='text'
              placeholder={t('modal.titlePlaceholder')}
              className={styles.input}
            />
            {errors.title?.message && (
              <p className={styles.errorPosition}>{errors.title?.message}</p>
            )} */}
            <TextBox
              inputStyle='inputCreate'
              placeholder={t('modal.titlePlaceholder')}
              type='text'
              label='title'
              register={register}
              error={errors?.title?.message}
              errorPosition='errorTitlePosition'
              required={TITLE_VALIDATION}
            />
            <Button buttonStyle='fifthButtonStyle'>
              {t('modal.addColumn')}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default observer(CreateColumnModalWindow)
