import styles from "./CreateListModalWindow.module.scss"
import { Button } from ".."
import { useRef } from "react"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"


const CreateListModalWindow = ({ isListModalOpened, onModalClose }) => {

   const listRef = useRef(null)

   return (
      <div className={`${styles.backFon} ${isListModalOpened && styles.opened}`}>
         <div className={styles.createArea}>
            <div className={styles.modalBody}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <span className={styles.title}>List Title</span>
               <form className={styles.form} onSubmit={(e) => {
                  e.preventDefault()
                  BoardStore.pushList(listRef.current.value)
               }}>
                  <input type="text" placeholder="Title" className={styles.input} ref={listRef} />
                  <Button onClick={onModalClose} buttonStyle="fifthButtonStyle">Add List</Button>
               </form>
            </div>
         </div>
      </div>

   )
}


export default observer(CreateListModalWindow)