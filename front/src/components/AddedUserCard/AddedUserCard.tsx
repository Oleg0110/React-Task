import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { stateManager, stateOwner } from '../../utils/constants'
import { Button, DeleteUserModal } from '..'
import urlValue from '../../utils/functions'
import useStore from '../../hooks/useStore'
import styles from './AddedUserCard.module.scss'

interface IFindUserProps {
  id: string
}

const AddedUserCard: React.FC<IFindUserProps> = ({ id }) => {
  const { userStore } = useStore()
  const { usersOnProject, userId } = userStore

  const foundUser = usersOnProject?.find((found) => found.id === id)

  const { name, email } = foundUser!

  const history = useHistory()

  const { projectId } = urlValue(history.location.pathname)

  const { t } = useTranslation()

  const [isModalOpened, setIsModalOpened] = useState(false)

  const onProject = usersOnProject
    ?.find((found) => found.id === userId)
    ?.projects.find((found) => found.projectId === projectId)

  const state =
    onProject?.state === stateOwner || onProject?.state === stateManager

  return (
    <div className={styles.userCard}>
      <DeleteUserModal
        idUser={id}
        setIsModalOpened={setIsModalOpened}
        isModalOpened={isModalOpened}
      />
      <div className={styles.infoField}>
        <div className={styles.user}>
          <p className={styles.userName}>{name}</p>
          <p className={styles.userEmail}>{email}</p>
        </div>
        {state && (
          <div className={styles.buttonPosition}>
            <Button
              tooltipContent={t('tooltip.delete')}
              onClick={() => setIsModalOpened(!isModalOpened)}
            >
              <div className={styles.delete} />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default observer(AddedUserCard)
