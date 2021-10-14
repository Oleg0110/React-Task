import React from "react";
import { Button } from ".."
import { ProjectsStore } from "../../stores";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { TITLE_VALIDATION } from "../../utils/validation";
import { useTranslation } from "react-i18next";
import styles from "./ChangeProjectTitleModal.module.scss"
import { IModalWindowProps } from "utils/interFace";

interface IOnSubmitProps {
  title: string,
}

const ChangeProjectTitleModal: React.FC<IModalWindowProps> = ({ isModalOpened, onModalClose, id }) => {

  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: IOnSubmitProps) => ProjectsStore.changedProjecTitle(data.title, id)

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
            <input
              {...register("title", TITLE_VALIDATION)}
              type="text" placeholder={t("modal.projectTitle")} className={styles.input} />
            {errors.title?.message && <p className={styles.errorPosition}>
              {errors.title?.message}
            </p>}
            <Button buttonStyle="fifthButtonStyle">{t("modal.changeTitle")}</Button>
          </form>
        </div>
      </div>
    </>
  )
}


export default observer(ChangeProjectTitleModal)