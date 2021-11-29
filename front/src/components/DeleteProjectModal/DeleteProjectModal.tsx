import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { IModalWindowProps } from '../../utils/interFace'
import { Button } from '..'
import useStore from '../../hooks/useStore'
import styles from './DeleteProjectModal.module.scss'

const DeleteProjectModal: React.FC<IModalWindowProps> = ({
  isModalOpened,
  setIsModalOpened,
  id,
}) => {
  const { projectStore } = useStore()
  const { deletedProject } = projectStore

  const { t } = useTranslation()

  const onClick = () => {
    deletedProject(id)
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
          <span className={styles.title}>{t('modal.sure')}</span>
          <Button onClick={onClick} buttonStyle='fifthButtonStyle'>
            {t('modal.delete')}
          </Button>
        </div>
      </div>
    </>
  )
}

export default observer(DeleteProjectModal)
