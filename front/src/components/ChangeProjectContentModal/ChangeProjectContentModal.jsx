import styles from "./ChangeProjectContentModal.module.scss"
import { Button } from ".."
import { ProjectsStore } from "../../stores";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { CREATE_CONTENT_VALIDATION } from "../../utils/validation";



const ChangeProjectContentModal = ({ isModalOpened, onModalClose, id }) => {

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = data => {
      ProjectsStore.changeProjecContent(data.content, id)
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
                     type="textarea" placeholder="Description" className={styles.inputText} />
                  {errors.content?.message && <p className={styles.errorPosition}>
                     {errors.content?.message}
                  </p>}
                  <Button buttonStyle="fifthButtonStyle">Change Title</Button>
               </form>
            </div>
         </div>
      </>
   )
}


export default observer(ChangeProjectContentModal)