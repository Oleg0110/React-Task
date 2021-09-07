import styles from "./LogInField.module.scss"
import { Button } from '..';
import { useForm } from "react-hook-form";
import { PASSWORD_VALIDATION, TITLE_VALIDATION } from "../../utils/validation";
import { useClickOutside } from "../../hooks";
import { useRef } from "react";


const LogInField = ({ isOpened, onModalClose, onClick, onClickOutside }) => {

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = () => {
      console.log("yes");
   }

   const ref = useRef(null)

   useClickOutside(ref, onClickOutside)


   return (
      <div className={isOpened ? styles.sidebar : styles.opened} ref={ref}>
         <div className={styles.content}>
            <div className={styles.logoPosition}>
               <h1 className={styles.logo}>DILA</h1>
            </div>
            <div>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <form className={styles.infoAccountBlock} onSubmit={handleSubmit(onSubmit)}>
                  <input type="text" placeholder="Name" className={styles.inputName} {...register("name", TITLE_VALIDATION)} />
                  {errors.name?.message && <p className={styles.errorPosition}>
                     {errors.name?.message}
                  </p>}
                  <input type="password" placeholder="Password" className={styles.inputPassword} {...register("password", PASSWORD_VALIDATION)} />
                  {errors.password?.message && <p className={styles.errorPosition}>
                     {errors.password?.message}
                  </p>}
                  <div className={styles.buttonPosition}>
                     <Button buttonStyle="fifthButtonStyle"><span className={styles.buttonName}> Log In</span></Button>
                  </div>
               </form>
               <hr />
               <p className={styles.changeSign}>{"Don't have an account? "}
                  <Button onClick={onClick}>
                     <span className={styles.buttonStyle}>Sign up</span>
                  </Button>
               </p>
            </div>
         </div>
      </div>
   )

}

export default LogInField