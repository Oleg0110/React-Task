import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import { IUserType } from 'utils/types'
import { Pagination, UserCard } from '../../components'
import useMedia from '../../hooks/useMedia'
import {
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
} from '../../utils/constants'
import { UserStore } from '../../stores'
import urlValue from '../../utils/functions'
import styles from './People.module.scss'

const People: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [usersOnPage] = useState(2)

  const history = useHistory()

  const local = history.location.search

  useEffect(() => {
    if (local) {
      const page = +urlValue(local).page

      setCurrentPage(page)

      UserStore.asyncGetUsers(page, usersOnPage)
    } else {
      UserStore.asyncGetUsers(currentPage, usersOnPage)
    }
  }, [currentPage, usersOnPage, local])

  const { users } = UserStore

  const currentUser: IUserType[] = users?.currentUser || []
  const allUsers = users?.allUsers

  const { t } = useTranslation()

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const projectsCount = (): string => {
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
            {currentUser.map((data) => (
              <UserCard name={data.name} email={data.email} key={data._id} />
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
