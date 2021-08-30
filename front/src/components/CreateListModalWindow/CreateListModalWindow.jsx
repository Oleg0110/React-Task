import styles from "./CreateListModalWindow.module.scss"
import { Button } from ".."
import { useForm } from "react-hook-form";
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { TITLE_VALIDATION } from "../../utils/validation";
import { useMedia } from "../../hooks";
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants";


const CreateListModalWindow = ({ isListModalOpened, onModalClose }) => {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

   const { register, handleSubmit, formState: { errors } } = useForm();
   const onSubmit = data => {
      BoardStore.pushList(data.title)
   }


   return (
      <>
         <div className={`${styles.backFon} ${isListModalOpened && styles.opened}`} onClick={onModalClose}></div>
         <div className={`${styles.createArea} ${isListModalOpened && styles.openedCreate}`}>
            <div className={styles.modalBody}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <span className={styles.title}>List Title</span>
               <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("title", TITLE_VALIDATION)} type="text" placeholder="Title"
                     className={`${styles.input} ${styles[`input${responsive}`]}`} />
                  {errors.title?.message && <p className={styles.errorPosition}>
                     {errors.title?.message}
                  </p>}
                  <Button buttonStyle="fifthButtonStyle">Add List</Button>
               </form>
            </div>
         </div>
      </>

   )
}


export default observer(CreateListModalWindow)