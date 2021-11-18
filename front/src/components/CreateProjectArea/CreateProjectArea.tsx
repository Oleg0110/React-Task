import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Button, TextBox } from '..'
import useMedia from '../../hooks/useMedia'
import {
  CREATE_CONTENT_VALIDATION,
  TITLE_VALIDATION,
} from '../../utils/validation'
import {
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
} from '../../utils/constants'
import useStore from '../../hooks/useStore'
import styles from './CreateProjectArea.module.scss'

interface IOnSubmitProps {
  title: string
  content: string
}

const CreateProjectArea: React.FC = () => {
  const { projectStore } = useStore()
  const { pushProject } = projectStore

  const { t } = useTranslation()

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: IOnSubmitProps) => {
    pushProject(data.title, data.content)
  }

  return (
    <div
      className={`${styles.createArea} ${styles[`createArea${responsive}`]}`}
    >
      <h2 className={styles.createCardTitle}>{t('createProject.title')}</h2>
      <form
        className={styles.descriptionProjectBlock}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className={styles.projectTitle}>{t('createProject.name')}</h3>
        <TextBox
          inputStyle='inputCreateProject'
          placeholder={t('createProject.titlePlaceholder')}
          type='text'
          label='title'
          register={register}
          error={errors.title?.message}
          errorPosition='errorTitlePosition'
          required={TITLE_VALIDATION}
        />
        <h3 className={styles.projectTitle}>
          {t('createProject.description')}
        </h3>
        <TextBox
          inputStyle='createProjectContent'
          placeholder={t('createProject.descriptionPlaceholder')}
          label='content'
          register={register}
          error={errors.content?.message}
          errorPosition='errorContentPosition'
          required={CREATE_CONTENT_VALIDATION}
        />
        <Button buttonStyle='fourthButtonStyle'>
          {t('createProject.create')}
        </Button>
      </form>
    </div>
  )
}

export default observer(CreateProjectArea)
