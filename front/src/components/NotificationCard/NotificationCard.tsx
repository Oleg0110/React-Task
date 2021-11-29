import React from 'react'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import useStore from '../../hooks/useStore'
import { INotification } from '../../utils/interFace'
import { ROUTES } from '../../utils/constants'
import { Button } from '..'
import styles from './NotificationCard.module.scss'

interface INotificationCardProps {
  notificationData: INotification
  setIsModalOpened: (boolean: boolean) => void
}

const NotificationCard: React.FC<INotificationCardProps> = ({
  notificationData,
  setIsModalOpened,
}) => {
  const { projectStore } = useStore()
  const { projects } = projectStore

  const { t } = useTranslation()
  const history = useHistory()

  const { notification, projectId, projectName } = notificationData

  const projectTitle = projects.find((found) => found.id === projectId)?.title

  return (
    <div className={styles.notificationField}>
      <div className={styles.card}>
        <p>
          {notification}
          <Button
            onClick={() => {
              if (projectName) {
                return toast.error(t('notification.error'))
              }
              history.push(`${ROUTES.dashboard}/${projectId}`)
              return setIsModalOpened(false)
            }}
          >
            <span className={styles.projectName}>
              {projectTitle || projectName}
            </span>
          </Button>
        </p>
      </div>
    </div>
  )
}

export default observer(NotificationCard)
