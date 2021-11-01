import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { UserStore } from '../../stores'
import urlValue from '../../utils/functions'
import { Button } from '..'
import styles from './AddToProjectModal.module.scss'

interface IAddToProjectModalProps {
  isModalOpened: boolean
  setIsModalOpened: (boolean: boolean) => void
  userId: string
}

const AddToProjectModal: React.FC<IAddToProjectModalProps> = ({
  isModalOpened,
  setIsModalOpened,
  userId,
}) => {
  const { projectId } = urlValue(window.location.href)
  const { t } = useTranslation()

  const setManager = () => {
    UserStore.addToProject(userId, projectId, 'manager')

    setIsModalOpened(false)
  }
  const setDeveloper = () => {
    UserStore.addToProject(userId, projectId, 'developer')

    setIsModalOpened(false)
  }
  const setQa = () => {
    UserStore.addToProject(userId, projectId, 'qa')

    setIsModalOpened(false)
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
          <div className={styles.labelBox}>
            <span className={styles.title}>{t('modal.choose')}</span>
            <div className={styles.labelcheckboxPosition}>
              <Button onClick={setManager}>
                <span className={styles.buttonStyle}>Manager</span>
              </Button>
              <Button onClick={setDeveloper}>
                <span className={styles.buttonStyle}>Developer</span>
              </Button>
              <Button onClick={setQa}>
                <span className={styles.buttonStyle}>QA</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(AddToProjectModal)
