import { Button } from ".."
import { ProjectsStore } from "../../stores"
import styles from "./DeleteModalWindow.module.scss"

const DeleteModalWindow = ({ isModalOpened, onModalClose, id }) => {
   const onClick = () => {
      ProjectsStore.deleteProject(id)
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
               <Button onClick={() => onClick()} buttonStyle="fifthButtonStyle">Delete</Button>
            </div>
         </div>
      </>
   )
}

export default DeleteModalWindow