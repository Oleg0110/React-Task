import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import { Pagination, UserCard } from '../../components'
import useMedia from '../../hooks/useMedia'
import {
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
} from '../../utils/constants'
import urlValue from '../../utils/functions'
import { IUser } from '../../utils/interface'
import useStore from '../../hooks/useStore'
import styles from './People.module.scss'

const People: React.FC = () => {
  const { userStore } = useStore()
  const { usersPagination, asyncGetUsers } = userStore

  const { t } = useTranslation()
  const history = useHistory()

  const [currentPage, setCurrentPage] = useState(1)
  const [usersOnPage] = useState(10)

  const local = history.location.search

  useEffect(() => {
    if (local) {
      const page = +urlValue(local).page

      setCurrentPage(page)

      asyncGetUsers(page, usersOnPage)
    } else {
      asyncGetUsers(currentPage, usersOnPage)
    }
  }, [setCurrentPage, asyncGetUsers, currentPage, usersOnPage, local])

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const currentUser: IUser[] = usersPagination?.currentUser || []
  const allUsers = usersPagination?.allUsers

  const projectsCount = () => {
    const count = `${allUsers === 0 ? styles.countNone : styles.count}`
    return count
  }

  return (
    <div className={styles.mainBlock}>
      <h1 className={styles.title}>
        {t('people.title')}
        <span className={projectsCount()}>{allUsers}</span>
      </h1>
      <div className={styles.peopleField}>
        <div className={`${styles.backFon} ${styles[`backFon${responsive}`]}`}>
          <div className={styles.scroll}>
            {!usersPagination && <div className={styles.loader} />}
            {currentUser.map((data) => (
              <UserCard name={data.name} email={data.email} key={data.id} />
            ))}
          </div>
        </div>
        <Pagination
          usersOnPage={usersOnPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default observer(People)
