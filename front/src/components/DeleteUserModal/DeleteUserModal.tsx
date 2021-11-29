import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'
import urlValue from '../../utils/functions'
import { Button } from '..'
import useStore from '../../hooks/useStore'
import styles from './DeleteUserModal.module.scss'

interface IDeleteTaskModalProps {
  idUser: string
  isModalOpened: boolean
  setIsModalOpened: (boolean: boolean) => void
}

const DeleteUserModal: React.FC<IDeleteTaskModalProps> = ({
  isModalOpened,
  setIsModalOpened,
  idUser,
}) => {
  const { userStore } = useStore()
  const { userId, deleteUser } = userStore

  const history = useHistory()

  const { projectId } = urlValue(history.location.pathname)

  const { t } = useTranslation()

  const onClick = () => {
    if (idUser === userId) {
      return toast.error('Sorry, you cannot delete yourself')
    }
    setIsModalOpened(false)
    return deleteUser(idUser, projectId)
  }
  return (
    <>
      <button
        type='button'
        className={`${styles.backFon} ${isModalOpened && styles.opened}`}
        onClick={() => setIsModalOpened(false)}
        aria-label='Open Modal Window'
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
