import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { Button, NotificationCard } from '..'
import useStore from '../../hooks/useStore'
import { IAllType } from '../../utils/types'
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
  const { user, userId, userToken, clearUserNotification } = userStore

  const { t } = useTranslation()

  const isAuth = !!userToken

  const sidebarHeight = () => {
    const sidebar = isAuth ? styles.sidebarHeight : styles.sidebar
    return sidebar
  }

  const clearNotification = () => {
    clearUserNotification(userId)
    setIsModalOpened(false)
  }

  const allNotifications: IAllType[] | null = []

  user?.notification.map((el) => {
    if (el.text === 'notification-1') {
      allNotifications.push({
        noti: t('notification.addToProject'),
        ...el,
      })
    } else if (el.text === 'notification-2') {
      allNotifications.push({
        noti: t('notification.removeFromProject'),
        ...el,
      })
    } else if (el.text === 'notification-3') {
      allNotifications.push({
        noti: t('notification.assigne'),
        ...el,
      })
    } else if (el.text === 'notification-4') {
      allNotifications.push({
        noti: t('notification.removedAssignment'),
        ...el,
      })
    }
    return {}
  })

  return (
    <div className={isOpened ? sidebarHeight() : styles.opened}>
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
            key={data.id}
            all={data}
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
