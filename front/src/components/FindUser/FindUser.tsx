import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { Button, AddToProjectModal } from '..'
import styles from './FindUser.module.scss'

interface IFindUserProps {
  name: string
  email: string
  id: string
}

const FindUser: React.FC<IFindUserProps> = ({ name, email, id }) => {
  const { t } = useTranslation()

  const [isModalOpened, setIsModalOpened] = useState(false)

  return (
    <>
      <AddToProjectModal
        userId={id}
        setIsModalOpened={setIsModalOpened}
        isModalOpened={isModalOpened}
      />
      <div className={styles.userCard}>
        <div className={styles.infoField}>
          <div className={styles.user}>
            <p className={styles.userName}>{name}</p>
            <p className={styles.userEmail}>{email}</p>
          </div>
          <div className={styles.buttonPosition}>
            <Button
              tooltipContent={t('tooltip.addToProject')}
              onClick={() => setIsModalOpened(!isModalOpened)}
            >
              <div className={styles.plus} />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(FindUser)
