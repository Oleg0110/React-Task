import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { Button, NotificationCard } from '..'
import useStore from '../../hooks/useStore'
import { INotification } from '../../utils/interface'
import styles from './Notification.module.scss'

interface INotificationProps {
  isOpened: boolean
  setIsModalOpened: (boolean: boolean) => void
}

const Notification: React.FC<INotificationProps> = ({
  isOpened,
  setIsModalOpened,
}) => {
  const { userStore } = useStore()
  const { user, userId, clearUserNotification } = userStore

  const { t } = useTranslation()

  const clearNotification = () => {
    clearUserNotification(userId)
    setIsModalOpened(false)
  }

  const allNotifications: INotification[] | null = []

  user?.notification.map((el) => {
    const noti = { ...el }

    switch (el.text) {
      case 'notification-1':
        noti.notification = t('notification.addToProject')
        break
      case 'notification-2':
        noti.notification = t('notification.removeFromProject')
        break
      case 'notification-3':
        noti.notification = t('notification.assigne')
        break
      case 'notification-4':
        noti.notification = t('notification.removedAssignment')
        break
    }
    return allNotifications.push(noti)
  })

  return (
    <div className={isOpened ? styles.sidebarHeight : styles.opened}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {t('notification.title')}
          <span className={styles.countUser}>{user?.notification.length}</span>
        </h1>
        <Button onClick={() => setIsModalOpened(false)}>
          <div className={styles.closeIcon} />
        </Button>
      </div>
      <div className={styles.notificationField}>
        {allNotifications.map((data) => (
          <NotificationCard
            key={data._id}
            notificationData={data}
            setIsModalOpened={setIsModalOpened}
          />
        ))}
      </div>
      <div className={styles.buttonPosition}>
        <Button onClick={clearNotification}>
          <span className={styles.buttonName}>Сlear</span>
        </Button>
      </div>
    </div>
  )
}

export default observer(Notification)
