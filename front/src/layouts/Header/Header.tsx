import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react'
import { Button, Notification } from '../../components'
import {
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
  ROUTES,
} from '../../utils/constants'
import useMedia from '../../hooks/useMedia'
import useStore from '../../hooks/useStore'
import styles from './Header.module.scss'
import '../../utils/i18next'

interface IHeaderProps {
  onClick: () => void
  userField: () => void
}

const Header: React.FC<IHeaderProps> = ({ onClick, children, userField }) => {
  const { userStore } = useStore()
  const { user, userToken } = userStore

  const { t, i18n } = useTranslation()
  const history = useHistory()

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const [searchOpened, setSearchOpened] = useState(false)
  const [isOpenedNotification, setIsOpenedNotification] = useState(false)

  const isAuth = !!userToken
  const logoName = user?.name.toLocaleUpperCase().charAt(0)

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value)
  }

  const searchHeaderInput = () => {
    const searchInput = `${styles[`searchHeaderInput${responsive}`]} ${
      searchOpened && styles.searchHeaderInputOpen
    }`
    return searchInput
  }

  const userPhoto = () => (!isAuth ? styles.empty : styles.userPhoto)

  const notificationCount = () => {
    if (user?.notification.length && user?.notification.length > 9) {
      return '9+'
    }
    return user?.notification.length
  }

  const notificationCountStyle = () => {
    if (user?.notification.length && user?.notification.length > 9) {
      return styles.notificationCountPlus
    }
    return styles.notificationCount
  }

  const notificationOpen = () => {
    if (user?.notification.length) {
      return setIsOpenedNotification(!isOpenedNotification)
    }
    return toast.info('You do not have notification')
  }

  const leng = () => {
    const len = localStorage.getItem('i18nextLng')
    if (len) {
      return len
    }
    return 'EN'
  }

  return (
    <header
      className={`${styles.mainHeaderStyle} ${
        styles[`mainHeaderStyle${responsive}`]
      }`}
    >
      <Notification
        isOpened={isOpenedNotification}
        setIsModalOpened={setIsOpenedNotification}
      />
      <div className={styles.logoField}>
        <Button tooltipContent={t('tooltip.sidebar')} onClick={onClick}>
          <div className={`${styles['open-sidebar-icon']}`} />
        </Button>
        <div className={styles.logoPosition}>
          <Button onClick={() => history.push('/home')}>
            <span className={styles.logo}>DILA</span>
          </Button>
        </div>
      </div>
      <div
        className={`${styles.linkHeaderButton} ${
          styles[`linkHeaderButton${responsive}`]
        }`}
      >
        {children}
      </div>
      <div className={styles.searchHeader}>
        <div className={`${styles.searchHeaderInput} ${searchHeaderInput()} `}>
          <input
            type='text'
            placeholder={t('header.searchPlaceholder')}
            className={`${styles.searchInput} ${
              styles[`searchInput${responsive}`]
            }`}
          />
          <div className={styles.searchIcon} />
        </div>
        <div className={styles.headerOptions}>
          <Button onClick={() => setSearchOpened(!searchOpened)}>
            <div
              className={`${styles.searchIconArea} ${
                styles[`searchIconArea${responsive}`]
              }`}
            />
          </Button>
          <Button
            tooltipContent={t('tooltip.notification')}
            onClick={() => isAuth && notificationOpen()}
          >
            <div className={`${styles.icon} ${styles['bell-icon']}`}>
              {user?.notification.length && (
                <div className={styles.bellNotification}>
                  <span className={notificationCountStyle()}>
                    {notificationCount()}
                  </span>
                </div>
              )}
            </div>
          </Button>
          <Button
            tooltipContent={t('tooltip.settings')}
            onClick={() => isAuth && history.push(ROUTES.settings)}
          >
            <div className={`${styles.icon} ${styles['setting-icon']}`} />
          </Button>
          <Button onClick={userField}>
            <div className={userPhoto()}>{logoName}</div>
          </Button>
          <select
            className={styles.language}
            onChange={(event) => changeLanguage(event)}
          >
            <option hidden>{leng()}</option>
            <option className={styles.option} value='EN'>
              EN
            </option>
            <option className={styles.option} value='UA'>
              UA
            </option>
            <option className={styles.option} value='RU'>
              RU
            </option>
          </select>
        </div>
      </div>
    </header>
  )
}

export default observer(Header)
