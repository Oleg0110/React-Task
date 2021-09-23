import styles from "./SignUpField.module.scss"
import { useForm } from "react-hook-form";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION, TITLE_VALIDATION } from "../../utils/validation";
import { Button } from "../../components";
import { useHistory } from "react-router";
import { UserStore } from "../../stores";
import { observer } from "mobx-react";
// import { toast } from "react-toastify";
// import { useAuth } from "../../hooks";
import { ROUTES } from "../../utils/constants";
import { useState } from "react";



const SignUpField = () => {


   const { register, handleSubmit, formState: { errors } } = useForm();
   const history = useHistory()
   const [isPassword, setIsPassword] = useState("password")

   // const { token } = useAuth()
   // const isAuthenticated = !!token

   const onSubmit = (data) => {
      UserStore.registerUser(data.email, data.name, data.password)
   }

   // const goToProjects = () => !isAuthenticated ? toast.error("some problems") : history.push(ROUTES.projects);


   return (
      <div className={styles.contentPosition} >
         <div className={styles.content}>
            <div className={styles.logoPosition}>
               <h1 className={styles.logo}>DILA</h1>
            </div>
            <h2 className={styles.title}>Sing up to make your first Project</h2>
            <form className={styles.infoAccountBlock} onSubmit={handleSubmit(onSubmit)}>
               <input type="email" placeholder="Email" className={styles.input} {...register("email", EMAIL_VALIDATION)} />
               {errors.email?.message && <p className={styles.errorPosition}>
                  {errors.email?.message}
               </p>}
               <input type="text" placeholder="Name" className={styles.input} {...register("name", TITLE_VALIDATION)} />
               {errors.name?.message && <p className={styles.errorPosition}>
                  {errors.name?.message}
               </p>}
               <input type={isPassword} placeholder="Password" className={styles.input} {...register("password", PASSWORD_VALIDATION)} />
               {errors.password?.message && <p className={styles.errorPosition}>
                  {errors.password?.message}
               </p>}
               <div className={styles.buttonPosition}>
                  <Button buttonStyle="fifthButtonStyle"
                  // onClick={() => goToProjects()}
                  >
                     <span className={styles.buttonName}>Sign up</span>
                  </Button>
               </div>
            </form>
            <Button onClick={() => setIsPassword(isPassword === "password" ? "text" : "password")}>
               <div className={`${styles.type} ${styles[`type-${isPassword}`]}`} />
            </Button>
            <p className={styles.attention}>By signing up, you agree to our
               <span className={styles.ourTerms}> Terms</span> and <span className={styles.ourTerms}>Data Policy</span>.</p>
         </div>
         <div className={styles.changeField}>
            <p className={styles.changeSign}>{"Have an account?   "}
               <Button onClick={() => history.push(ROUTES.userAauthLogIn)}>
                  <span className={styles.buttonStyle}>Log In</span>
               </Button>
            </p>
         </div>
      </div>
   )

}

export default observer(SignUpField)