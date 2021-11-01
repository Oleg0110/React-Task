import React from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import urlValue from '../../utils/functions'
import { TITLE_VALIDATION } from '../../utils/validation'
import { BoardStore } from '../../stores'
import { Button, TextBox } from '..'
import styles from './CreateColumnModalWindow.module.scss'

interface ICreateColumnModalWindowProps {
  isModalOpened: boolean
  onModalClose?: () => void
}

interface IOnSubmitProps {
  title: string
}

const CreateColumnModalWindow: React.FC<ICreateColumnModalWindowProps> = ({
  isModalOpened,
  onModalClose,
}) => {
  const { projectId } = urlValue(window.location.href)

  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: IOnSubmitProps) => {
    BoardStore.pushColumn(data.title, projectId)
  }

  return (
    <>
      <button
        type='button'
        className={`${styles.backFon} ${isModalOpened && styles.opened}`}
        onClick={onModalClose}
      />
      <div
        className={`${styles.createArea} ${
          isModalOpened && styles.openedCreate
        }`}
      >
        <div className={styles.modalBody}>
          <div className={styles.closeIconPosition}>
            <Button onClick={onModalClose}>
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
