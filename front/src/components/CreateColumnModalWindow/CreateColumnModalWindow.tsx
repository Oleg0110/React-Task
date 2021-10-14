import React from "react";
import {
   Button,
   // TextBox 
} from ".."
import { useForm } from "react-hook-form";
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { TITLE_VALIDATION } from "../../utils/validation";
import { useTranslation } from "react-i18next";
import { urlValue } from "utils/functions";
import styles from "./CreateColumnModalWindow.module.scss"

interface ICreateColumnModalWindowProps {
   isModalOpened: boolean,
   onModalClose?: () => void,
}

interface IOnSubmitProps {
   title: string,
}

const CreateColumnModalWindow: React.FC<ICreateColumnModalWindowProps> = ({ isModalOpened, onModalClose }) => {

   const { t } = useTranslation();

   const { register, handleSubmit, formState: { errors } } = useForm();

   const projectId = urlValue(window.location.href).projectId

   const onSubmit = (data: IOnSubmitProps) => BoardStore.pushColumn(data.title, projectId)

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
               <span className={styles.title}>{t("modal.columnTitle")}</span>
               <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("title", TITLE_VALIDATION)} type="text" placeholder={t("modal.titlePlaceholder")}
                     className={styles.input} />
                  {errors.title?.message && <p className={styles.errorPosition}>
                     {errors.title?.message}
                  </p>}
                  {/* <TextBox inputStyle="inputCreateColumn" placeholder="Title" type="text" innerRef={register("title", TITLE_VALIDATION)} error={errors?.title?.message} /> */}
                  <Button buttonStyle="fifthButtonStyle">{t("modal.addColumn")}</Button>
               </form>
            </div>
         </div>
      </>

   )
}


export default observer(CreateColumnModalWindow)