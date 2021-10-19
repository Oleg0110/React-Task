import React from 'react'
import { observer } from 'mobx-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IModalWindowProps } from 'utils/interface'
import { Button, TextBox } from '..'
import { ProjectsStore } from '../../stores'
import { TITLE_VALIDATION } from '../../utils/validation'
import styles from './ChangeProjectTitleModal.module.scss'

interface IOnSubmitProps {
  title: string
}

const ChangeProjectTitleModal: React.FC<IModalWindowProps> = ({
  isModalOpened,
  onModalClose,
  id,
}) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: IOnSubmitProps) => {
    ProjectsStore.changedProjecTitle(data.title, id)
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
          <form
            className={styles.descriptionProjectBlock}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextBox
              inputStyle='inputCreate'
              placeholder={t('modal.projectTitle')}
              type='text'
              label='title'
              register={register}
              error={errors.title?.message}
              errorPosition='errorTitlePosition'
              required={TITLE_VALIDATION}
            />
            <div className={styles.buttonPosition}>
              <Button buttonStyle='fifthButtonStyle'>
                {t('modal.changeTitle')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default observer(ChangeProjectTitleModal)
