import { Button } from ".."
import { BoardStore } from "../../stores"
import styles from "./DeleteTaskModal.module.scss"

const DeleteTaskModal = ({ isModalOpened, onModalClose, id, listId }) => {
   const onClick = () => {
      BoardStore.deleteTask(id, listId)
   }

   return (
      <>
         <div className={`${styles.backFon} ${isModalOpened && styles.opened}`} onClick={onModalClose}></div>
         <div className={`${styles.createArea} ${isModalOpened && styles.openedCreate}`}>
            <div className={styles.modalBody}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <span className={styles.title}>Are You sure?</span>
               <Button onClick={onClick} buttonStyle="fifthButtonStyle">Delete</Button>
            </div>
         </div>
      </>
   )
}

export default DeleteTaskModal