import React from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { IModalWindowProps } from '../../utils/interface'
import { Button, TextBox } from '..'
import { CREATE_CONTENT_VALIDATION } from '../../utils/validation'
import useStore from '../../hooks/useStore'
import styles from './ChangeProjectContentModal.module.scss'

interface IOnSubmitProps {
  content: string
}

const ChangeProjectContentModal: React.FC<IModalWindowProps> = ({
  isModalOpened,
  onModalClose,
  id,
}) => {
  const { projectStore } = useStore()
  const { changedProjecContent } = projectStore

  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: IOnSubmitProps) => {
    changedProjecContent(data.content, id)
  }

  return (
    <>
      <button
        type='button'
        className={`${styles.backFon} ${isModalOpened && styles.opened}`}
        onClick={onModalClose}
        aria-label='Open Modal Window'
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
              inputStyle='changeProjectContent'
              placeholder={t('modal.descriptionPlaceholder')}
              label='content'
              register={register}
              error={errors.content?.message}
              errorPosition='changeContenterror'
              required={CREATE_CONTENT_VALIDATION}
            />
            <Button buttonStyle='fifthButtonStyle'>
              {t('modal.changeContent')}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default observer(ChangeProjectContentModal)
