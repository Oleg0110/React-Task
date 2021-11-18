import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { IModalWindowProps } from '../../utils/interface'
import { Button } from '..'
import useStore from '../../hooks/useStore'
import styles from './DeleteColumnModal.module.scss'

const DeleteColumnModal: React.FC<IModalWindowProps> = ({
  isModalOpened,
  onModalClose,
  id,
}) => {
  const { boardStore } = useStore()
  const { deletedColumn } = boardStore

  const { t } = useTranslation()

  const onClick = () => deletedColumn(id)

  return (
    <>
      <button
        type='button'
        className={`${styles.backFon} ${isModalOpened && styles.opened}`}
        onClick={onModalClose}
        aria-label='Open Modal Window'
      />
      <div
        className={`${styles.createArea} ${
          isModalOpened && styles.openedCreate
        }`}
      >
        <div className={styles.modalBody}>
          <div className={styles.closeIconPosition}>
            <Button onClick={onModalClose}>
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

export default observer(DeleteColumnModal)
