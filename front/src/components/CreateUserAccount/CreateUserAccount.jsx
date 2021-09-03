import { useRef } from "react"
import Button from "../Button/Button"
import styles from "./CreateUserAccount.module.scss"



const CreateUserAccount = ({ isOpened, onClick, onModalClose }) => {

   const nameRef = useRef(null)
   const emailRef = useRef(null)


   return (
      <div className={`${styles.backFon} ${isOpened && styles.opened}`}>
         <div className={styles.createCreateAccountArea}>
            <div className={styles.createArea}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <h2 className={styles.createAccountTitle}>Create Account</h2>
               <form className={styles.infoAccountBlock} onSubmit={(e) => {
                  e.preventDefault()
               }}>
                  <h3 className={styles.title}>User Name :</h3>
                  <input type="text" placeholder="Name" className={styles.inputNane} ref={nameRef} />
                  <h3 className={styles.title}>User Email :</h3>
                  <input type="email" placeholder="Email" className={styles.inputText} ref={emailRef} />
                  <Button onClick={onClick} buttonStyle="fifthButtonStyle">Create Account</Button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default CreateUserAccount