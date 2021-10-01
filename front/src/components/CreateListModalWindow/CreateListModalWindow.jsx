import styles from "./CreateListModalWindow.module.scss"
import {
   Button,
   // TextBox 
} from ".."
import { useForm } from "react-hook-form";
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { TITLE_VALIDATION } from "../../utils/validation";
import { useTranslation } from "react-i18next";




const CreateListModalWindow = ({ isListModalOpened, onModalClose }) => {

   const { t } = useTranslation();

   const { register, handleSubmit, formState: { errors } } = useForm();

   const projectId = window.location.href.split("dashboards/")[1];

   const onSubmit = data => {
      BoardStore.pushList(data.title, projectId)
   }




   return (
      <>
         <div className={`${styles.backFon} ${isListModalOpened && styles.opened}`} onClick={onModalClose}></div>
         <div className={`${styles.createArea} ${isListModalOpened && styles.openedCreate}`}>
            <div className={styles.modalBody}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <span className={styles.title}>{t("modal.listTitle")}</span>
               <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("title", TITLE_VALIDATION)} type="text" placeholder={t("modal.titlePlaceholder")}
                     className={styles.input} />
                  {errors.title?.message && <p className={styles.errorPosition}>
                     {errors.title?.message}
                  </p>}
                  {/* <TextBox inputStyle="inputCreateList" placeholder="Title" type="text" innerRef={register("title", TITLE_VALIDATION)} error={errors?.title?.message} /> */}
                  <Button buttonStyle="fifthButtonStyle">{t("modal.addList")}</Button>
               </form>
            </div>
         </div>
      </>

   )
}


export default observer(CreateListModalWindow)