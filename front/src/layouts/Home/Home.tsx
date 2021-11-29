import React, { useEffect } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { Button } from '../../components'
import useMedia from '../../hooks/useMedia'
import {
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
  ROUTES,
} from '../../utils/constants'
import useStore from '../../hooks/useStore'
import styles from './Home.module.scss'

const Home: React.FC<RouteComponentProps> = ({ children }) => {
  const { userStore, projectStore } = useStore()
  const { isAuthenticated } = userStore
  const { asyncGetProjects } = projectStore

  useEffect(() => {
    if (isAuthenticated) {
      asyncGetProjects()
    }
  }, [asyncGetProjects, isAuthenticated])

  const { t } = useTranslation()
  const history = useHistory()

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const attention = isAuthenticated
    ? `${t('home.create')}`
    : `${t('home.wont')}`
  const attentionSignUpButton = isAuthenticated
    ? `${t('home.makeProject')}`
    : `${t('home.go')}`
  const attentionLink = isAuthenticated
    ? ROUTES.projects
    : ROUTES.userAauthLogIn

  return (
    <div className={styles.backFon}>
      <div className={styles.logoPosition}>
        <h1 className={`${styles.logo} ${styles[`logo${responsive}`]}`}>
          DILA
        </h1>
        <hr
          className={`${styles.underLine} ${styles[`underLine${responsive}`]}`}
        />
      </div>
      <h1 className={` ${styles.title} ${styles[`title${responsive}`]}`}>
        {t('home.title')}
        <span
          className={`${styles.projectTitle} ${
            styles[`projectTitle${responsive}`]
          }`}
        >
          React
          {t('home.projectTitle')}
        </span>
      </h1>
      <hr className={styles.line} />
      <p className={`${styles.create} ${styles[`create${responsive}`]}`}>
        {attention}
      </p>
      <Button
        onClick={() => history.push(attentionLink)}
        buttonStyle='fifthButtonStyle'
      >
        <span className={styles.buttonName}>{attentionSignUpButton}</span>
      </Button>
      {children}
    </div>
  )
}

export default observer(Home)
