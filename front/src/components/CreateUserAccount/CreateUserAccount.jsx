import styles from "./CreateUserAccount.module.scss"
import { Button } from ".."
import { useForm } from "react-hook-form";
import { TITLE_VALIDATION } from "../../utils/validation";



const CreateUserAccount = ({ isOpened, onClick, onModalClose }) => {


   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = () => {
      console.log("yes");
   }

   return (
      <>
         <div className={`${styles.backFon} ${isOpened && styles.opened}`} onClick={onModalClose}></div>
         <div className={`${styles.createAccountArea} ${isOpened && styles.openedCreate}`}>
            <div className={styles.createArea}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <h2 className={styles.createAccountTitle}>Create Account</h2>
               <form className={styles.infoAccountBlock} onSubmit={handleSubmit(onSubmit)}>
                  <h3 className={styles.title}>User Name :</h3>
                  <input type="text" placeholder="Name" className={styles.inputName} {...register("name", TITLE_VALIDATION)} />
                  {errors.name?.message && <p className={styles.errorNamePosition}>
                     {errors.name?.message}
                  </p>}
                  <h3 className={styles.title}>User Email :</h3>
                  <input type="email" placeholder="Email" className={styles.inputText} {...register("email", TITLE_VALIDATION)} />
                  {errors.email?.message && <p className={styles.errorEmailPosition}>
                     {errors.email?.message}
                  </p>}
                  <Button onClick={onClick} buttonStyle="fifthButtonStyle">Create Account</Button>
               </form>
            </div>
         </div>

      </>
   )
}

export default CreateUserAccount