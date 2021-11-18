import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { Button } from '..'
import urlValue from '../../utils/functions'
import useStore from '../../hooks/useStore'
import styles from './FindAsigneeUser.module.scss'

interface IFindAsigneeUser {
  name: string
  email: string
  id: string
  taskId: string
  columnId: string
  setIsModalOpened: (boolean: boolean) => void
}

const FindAsigneeUser: React.FC<IFindAsigneeUser> = ({
  name,
  email,
  id,
  taskId,
  columnId,
  setIsModalOpened,
}) => {
  // const { userStore } = useStore()
  const { boardStore } = useStore()
  const { asigneeUser } = boardStore

  const history = useHistory()

  const { projectId } = urlValue(history.location.pathname)

  const { t } = useTranslation()

  const asignee = () => {
    asigneeUser(id, taskId, projectId, columnId)
    setIsModalOpened(false)
  }

  return (
    <>
      <div className={styles.userCard}>
        <div className={styles.infoField}>
          <div className={styles.user}>
            <p className={styles.userName}>{name}</p>
            <p className={styles.userEmail}>{email}</p>
          </div>
          <div className={styles.buttonPosition}>
            <Button tooltipContent={t('tooltip.addToTask')} onClick={asignee}>
              <div className={styles.check} />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(FindAsigneeUser)
