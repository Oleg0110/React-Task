import styles from "./CreateListModalWindow.module.scss"
import { Button } from ".."
import { useRef } from "react"
import { useForm } from "react-hook-form";
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { MAIN_VALIDATION } from "../../utils/validation";


const CreateListModalWindow = ({ isListModalOpened, onModalClose }) => {

   // const listRef = useRef(null)

   const { register, handleSubmit, formState: { errors } } = useForm();
   const onSubmit = data => {
      // BoardStore.pushList(listRef.current.value)
      BoardStore.pushList(data.title)

   }

   return (
      <div className={`${styles.backFon} ${isListModalOpened && styles.opened}`}>
         <div className={styles.createArea}>
            <div className={styles.modalBody}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <span className={styles.title}>List Title</span>
               <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("title", MAIN_VALIDATION)} type="text" placeholder="Title" className={styles.input} />
                  {errors.title && <p>Required field</p>}
                  <Button
                     // onClick={onModalClose} 
                     buttonStyle="fifthButtonStyle">Add List</Button>
               </form>
               {/* <form className={styles.form} onSubmit={(e) => {
                  e.preventDefault()
                  BoardStore.pushList(listRef.current.value)
               }}>
                  <input type="text" placeholder="Title" className={styles.input} ref={listRef} />
                  <Button onClick={onModalClose} buttonStyle="fifthButtonStyle">Add List</Button>
               </form> */}
            </div>
         </div>
      </div>

   )
}


export default observer(CreateListModalWindow)