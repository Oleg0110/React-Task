import styles from "./CreateListModalWindow.module.scss"
import Button from "../Button/Button"
import { useRef } from "react"
import BoardStore from "../../stores/BoardStore/BoardStore"


const CreateListModalWindow = ({ isModalOpened, onModalClose }) => {

   const ref = useRef(null)

   return (
      <div className={`${styles.backFon} ${isModalOpened && styles.opened}`}>
         <div className={styles.modalBody}>
            <div className={styles.closeIconPosition}>
               <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
            </div>
            <span className={styles.title}>List Title</span>
            <form className={styles.form} onSubmit={(e) => {
               e.preventDefault()
               BoardStore.pushList(ref.current.value)
               console.log(BoardStore.lists.length);
            }}>
               <input type="text" placeholder="Title" className={styles.input} ref={ref} />
               <Button onClick={onModalClose} buttonStyle="thirdButtonStyle">Add List</Button>
            </form>
         </div>
      </div>

   )
}


export default CreateListModalWindow