import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { toast } from 'react-toastify'
import urlValue from '../../utils/functions'
import { Button } from '..'
import { UserStore } from '../../stores'
import { IUserState } from '../../utils/types'
import styles from './DeleteUserModal.module.scss'

interface IDeleteTaskModalProps {
  userId: string
  isModalOpened: boolean
  setIsModalOpened: (boolean: boolean) => void
}

const DeleteUserModal: React.FC<IDeleteTaskModalProps> = ({
  isModalOpened,
  setIsModalOpened,
  userId,
}) => {
  const userLocalId = UserStore.userId
  const { projectId } = urlValue(window.location.href)

  const { t } = useTranslation()

  const onClick = () => {
    if (userId === userLocalId) {
      return toast.error('Sorry, you cannot delete yourself')
    }
    return UserStore.deleteUser(userId, projectId)
  }
  return (
    <>
      <button
        type='button'
        className={`${styles.backFon} ${isModalOpened && styles.opened}`}
        onClick={() => setIsModalOpened(false)}
      />
      <div
        className={`${styles.createArea} ${
          isModalOpened && styles.openedCreate
        }`}
      >
        <div className={styles.modalBody}>
          <div className={styles.closeIconPosition}>
            <Button onClick={() => setIsModalOpened(false)}>
              <div className={styles.closeIcon} />
            </Button>
          </div>
          <span className={styles.title}>{t('modal.sure')}</span>
          <Button onClick={onClick} buttonStyle='fifthButtonStyle'>
            {t('modal.delete')}
          </Button>
        </div>
      </div>
    </>
  )
}

export default observer(DeleteUserModal)
