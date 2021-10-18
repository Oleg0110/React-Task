import React from 'react'
import { IModalWindowProps } from 'utils/interface'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { Button } from '..'
import { BoardStore } from '../../stores'
import styles from './DeleteColumnModal.module.scss'

const DeleteColumnModal: React.FC<IModalWindowProps> = ({
  isModalOpened,
  onModalClose,
  id,
}) => {
  const { t } = useTranslation()

  const onClick = () => BoardStore.deletedColumn(id)

  return (
    <>
      <button
        type='button'
        className={`${styles.backFon} ${isModalOpened && styles.opened}`}
        onClick={onModalClose}
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
