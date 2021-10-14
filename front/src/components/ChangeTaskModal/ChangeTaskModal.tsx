import React from "react";
import { Button } from ".."
import { BoardStore } from "../../stores";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { CREATE_CONTENT_VALIDATION } from "../../utils/validation";
import { useTranslation } from "react-i18next";
import styles from "./ChangeTaskModal.module.scss"
import { IModalWindowProps } from "utils/interFace";

interface IChangeTaskModalProps extends IModalWindowProps {
  columnId: string,
}

interface IOnSubmitProps {
  text: string,
}

const ChangeTaskModal: React.FC<IChangeTaskModalProps> = ({ isModalOpened, onModalClose, id, columnId }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { t } = useTranslation();

  const onSubmit = (data: IOnSubmitProps) => BoardStore.changeTask(data.text, id, columnId)

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
          <form className={styles.descriptionProjectBlock} onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register("text", CREATE_CONTENT_VALIDATION)}
              placeholder={t("modal.descriptionPlaceholder")} className={styles.inputText} />
            {errors.text?.message && <p className={styles.errorPosition}>
              {errors.text?.message}
            </p>}
            <Button buttonStyle="fifthButtonStyle">Change Task</Button>
          </form>
        </div>
      </div>
    </>
  )
}


export default observer(ChangeTaskModal)