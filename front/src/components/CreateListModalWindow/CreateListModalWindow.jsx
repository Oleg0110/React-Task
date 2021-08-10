import styles from "./CreateListModalWindow.module.scss"
import Button from "../Button/Button"
import { useRef } from "react"


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
               console.log(ref.current.value);
            }}>
               <input type="text" placeholder="Title" className={styles.input} ref={ref} />
               <Button buttonStyle="thirdButtonStyle">Add List</Button>
            </form>
         </div>
      </div>

   )
}


export default CreateListModalWindow