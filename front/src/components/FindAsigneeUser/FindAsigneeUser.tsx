import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { BoardStore } from '../../stores'
import { Button } from '..'
import styles from './FindAsigneeUser.module.scss'

interface IFindAsigneeUser {
  name: string
  email: string
  id: string
  taskId: string
}

const FindAsigneeUser: React.FC<IFindAsigneeUser> = ({
  name,
  email,
  id,
  taskId,
}) => {
  const { t } = useTranslation()

  const asignee = () => {
    BoardStore.setAsigneeUser(id, taskId)
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
