import styles from "./ChangeProjectContentModal.module.scss"
import { Button } from ".."
import { ProjectsStore } from "../../stores";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { CREATE_CONTENT_VALIDATION } from "../../utils/validation";
import { useTranslation } from "react-i18next";



const ChangeProjectContentModal = ({ isModalOpened, onModalClose, id }) => {

   const { t } = useTranslation();

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = data => {
      ProjectsStore.changedProjecContent(data.content, id)
   };

   return (
      <>
         <div className={`${styles.backFon} ${isModalOpened && styles.opened}`} onClick={onModalClose}></div>
         <div className={`${styles.createArea} ${isModalOpened && styles.openedCreate}`}>
            <div className={styles.modalBody}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <form className={styles.descriptionProjectBlock} onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                     {...register("content", CREATE_CONTENT_VALIDATION)}
                     type="textarea" placeholder={t("modal.descriptionPlaceholder")} className={styles.inputText} />
                  {errors.content?.message && <p className={styles.errorPosition}>
                     {errors.content?.message}
                  </p>}
                  <Button buttonStyle="fifthButtonStyle">{t("modal.changeContent")}</Button>
               </form>
            </div>
         </div>
      </>
   )
}


export default observer(ChangeProjectContentModal)