import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Button } from '..'
import { ProjectsStore } from '../../stores'
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
import styles from './CreateProjectArea.module.scss'

interface IOnSubmitProps {
  title: string
  content: string
}

const CreateProjectArea: React.FC = () => {
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
    ProjectsStore.pushProject(data.title, data.content)
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
        <input
          {...register('title', TITLE_VALIDATION)}
          type='text'
          placeholder={t('createProject.titlePlaceholder')}
          className={styles.inputName}
        />
        {errors.title?.message && (
          <p className={styles.errorNamePosition}>{errors.title?.message}</p>
        )}
        <h3 className={styles.projectTitle}>
          {t('createProject.description')}
        </h3>
        <textarea
          {...register('content', CREATE_CONTENT_VALIDATION)}
          placeholder={t('createProject.descriptionPlaceholder')}
          className={`${styles.inputText} 
             ${styles[`inputText${responsive}`]}`}
        />
        {errors.content?.message && (
          <p className={styles.errorContentPosition}>
            {errors.content?.message}
          </p>
        )}
        <Button buttonStyle='fourthButtonStyle'>
          {t('createProject.create')}
        </Button>
      </form>
    </div>
  )
}

export default observer(CreateProjectArea)
