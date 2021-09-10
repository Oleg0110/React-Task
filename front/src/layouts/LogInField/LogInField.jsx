import styles from "./LogInField.module.scss"
import { useForm } from "react-hook-form";
import { PASSWORD_VALIDATION, TITLE_VALIDATION } from "../../utils/validation";
import { Button } from "../../components";
import { useHistory } from "react-router";

const LogInField = () => {

   const { register, handleSubmit, formState: { errors } } = useForm();
   const history = useHistory()

   const onSubmit = () => {
      console.log("yes");
   }


   return (
      <div className={styles.contentPosition} >
         <div className={styles.content}>
            <div className={styles.logoPosition}>
               <h1 className={styles.logo}>DILA</h1>
            </div>
            <form className={styles.infoAccountBlock} onSubmit={handleSubmit(onSubmit)}>
               <input type="text" placeholder="Name" className={styles.input} {...register("name", TITLE_VALIDATION)} />
               {errors.name?.message && <p className={styles.errorPosition}>
                  {errors.name?.message}
               </p>}
               <input type="password" placeholder="Password" className={styles.input} {...register("password", PASSWORD_VALIDATION)} />
               {errors.password?.message && <p className={styles.errorPosition}>
                  {errors.password?.message}
               </p>}
               <div className={styles.buttonPosition}>
                  <Button buttonStyle="fifthButtonStyle"><span className={styles.buttonName}>Log In</span></Button>
               </div>
               <div className={styles.or}>
                  <div className={styles.orLine} />
                  <span className={styles.orWord}>OR</span>
                  <div className={styles.orLine} />
               </div>
               <Button><p className={styles.forgot}>Forgot password?</p></Button>
            </form>
         </div>
         <div className={styles.changeField}>
            <p className={styles.changeSign}>{"Don't have an account? "}
               <Button onClick={() => history.push("/user/sign-up")}>
                  <span className={styles.buttonStyle}>Sign up</span>
               </Button>
            </p>
         </div>
      </div>
   )

}

export default LogInField