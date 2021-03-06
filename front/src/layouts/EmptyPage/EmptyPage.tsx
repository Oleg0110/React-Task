import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './EmptyPage.module.scss'

const EmptyPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.backFon}>
      <h1 className={styles.title}>{t('empty.title')}</h1>
      <p className={styles.text}>{t('empty.text')}</p>
      <hr className={styles.line} />
    </div>
  )
}

export default EmptyPage
