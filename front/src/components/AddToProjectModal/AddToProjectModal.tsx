import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import urlValue from '../../utils/functions'
import { Button } from '..'
import useStore from '../../hooks/useStore'
import { stateDeveloper, stateManager, stateQA } from '../../utils/constants'
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
  const { userStore } = useStore()
  const { addToProject } = userStore

  const history = useHistory()

  const { projectId } = urlValue(history.location.pathname)
  const { t } = useTranslation()

  const setManager = () => {
    addToProject(userId, projectId, stateManager)

    setIsModalOpened(false)
  }
  const setDeveloper = () => {
    addToProject(userId, projectId, stateDeveloper)

    setIsModalOpened(false)
  }
  const setQa = () => {
    addToProject(userId, projectId, stateQA)

    setIsModalOpened(false)
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
