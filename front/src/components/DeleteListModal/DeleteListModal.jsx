import { Button } from ".."
import { BoardStore } from "../../stores"
import styles from "./DeleteListModal.module.scss"

const DeleteListModal = ({ isModalOpened, onModalClose, id }) => {

   const onClick = () => {
      BoardStore.deleteList(id)
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

export default DeleteListModal