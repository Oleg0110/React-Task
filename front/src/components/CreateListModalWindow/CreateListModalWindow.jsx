import styles from "./CreateListModalWindow.module.scss"
import { Button } from ".."
import { useForm } from "react-hook-form";
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { TITLE_VALIDATION } from "../../utils/validation";
import { MEDIUM_DEVICES, SMALL_DEVICES } from "../../utils/constants";
import { useMediaQuery } from "../../hooks";


const CreateListModalWindow = ({ isListModalOpened, onModalClose }) => {

   const smallDevices = useMediaQuery(SMALL_DEVICES)
   const mediumDevices = useMediaQuery(MEDIUM_DEVICES)

   const { register, handleSubmit, formState: { errors } } = useForm();
   const onSubmit = data => {
      BoardStore.pushList(data.title)
   }

   const createArea = () => {
      return `${isListModalOpened && styles.openedCreate} 
      ${mediumDevices && styles.createAreaMD} ${smallDevices && styles.createAreaSD}`
   }

   return (
      <>
         <div className={`${styles.backFon} ${isListModalOpened && styles.opened}`} onClick={onModalClose}></div>
         <div className={`${styles.createArea} ${createArea()}`}>
            <div className={`${styles.modalBody} ${mediumDevices && styles.modalBodyMD}`}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <span className={styles.title}>List Title</span>
               <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("title", TITLE_VALIDATION)} type="text" placeholder="Title"
                     className={`${styles.input} ${mediumDevices && styles.inputMD}`} />
                  {errors.title?.message && <p className={`${styles.errorPosition} ${mediumDevices && styles.errorPositionMD}`}>
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