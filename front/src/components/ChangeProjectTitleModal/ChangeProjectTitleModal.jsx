import styles from "./ChangeProjectTitleModal.module.scss"
import { Button } from ".."
import { ProjectsStore } from "../../stores";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { TITLE_VALIDATION } from "../../utils/validation";



const ChangeProjectTitleModal = ({ isModalOpened, onModalClose }) => {

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = data => {
      ProjectsStore.pushProject(data.title, data.content)
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
                  <input
                     {...register("title", TITLE_VALIDATION)}
                     type="text" placeholder="Title" className={styles.inputName} />
                  {errors.name?.message && <p className={styles.errorNamePosition}>
                     {errors.name?.message}
                  </p>}
                  <Button buttonStyle="fifthButtonStyle">Change Title</Button>
               </form>
            </div>
         </div>
      </>
   )
}


export default observer(ChangeProjectTitleModal)