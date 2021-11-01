import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { Button, DeleteUserModal } from '..'
import { UserStore } from '../../stores'
import urlValue from '../../utils/functions'
import styles from './AddedUserCard.module.scss'

interface IFindUserProps {
  name: string
  email: string
  id: string
}

const AddedUserCard: React.FC<IFindUserProps> = ({ name, email, id }) => {
  const { user } = UserStore
  const { projectId } = urlValue(window.location.href)

  const { t } = useTranslation()

  const [isModalOpened, setIsModalOpened] = useState(false)

  const owner = user?.projects.find(
    (found: any) => found.projectId === projectId,
  )

  const deleteUser = () => {
    if (owner.state !== 'owner' && owner.state !== 'manager') {
      return styles.none
    }
    return styles.buttonPosition
  }

  return (
    <>
      <DeleteUserModal
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
          <div className={deleteUser()}>
            <Button
              tooltipContent={t('tooltip.delete')}
              onClick={() => setIsModalOpened(!isModalOpened)}
            >
              <div className={styles.delete} />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(AddedUserCard)
