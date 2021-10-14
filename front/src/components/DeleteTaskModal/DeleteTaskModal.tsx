import React from "react";
import { Button } from ".."
import { BoardStore } from "../../stores"
import { useTranslation } from "react-i18next";
import styles from "./DeleteTaskModal.module.scss"
import { observer } from "mobx-react";
import { IModalWindowProps } from "utils/interFace";

interface IDeleteTaskModalProps extends IModalWindowProps {
  columnId: string,
}


const DeleteTaskModal: React.FC<IDeleteTaskModalProps> = ({ isModalOpened, onModalClose, id, columnId }) => {

  const { t } = useTranslation();

  const onClick = () => BoardStore.deleteTask(id, columnId)

  return (
    <>
      <div className={`${styles.backFon} ${isModalOpened && styles.opened}`} onClick={onModalClose} />
      <div className={`${styles.createArea} ${isModalOpened && styles.openedCreate}`}>
        <div className={styles.modalBody}>
          <div className={styles.closeIconPosition}>
            <Button onClick={onModalClose}>
              <div className={styles.closeIcon} />
            </Button>
          </div>
          <span className={styles.title}>{t("modal.sure")}</span>
          <Button onClick={onClick} buttonStyle="fifthButtonStyle">{t("modal.delete")}</Button>
        </div>
      </div>
    </>
  )
}

export default observer(DeleteTaskModal)