import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../utils/validation";
import { Button } from "../../components";
import { useHistory } from "react-router";
import { ROUTES } from "../../utils/constants";
import { UserStore } from "../../stores";
import { useTranslation } from "react-i18next";
import styles from "./LogInField.module.scss"

const LogInField: React.FC = () => {

   const { t } = useTranslation();

   const [isPassword, setIsPassword] = useState("password")

   const { register, handleSubmit, formState: { errors } } = useForm();
   const history = useHistory()

   const isAuth: boolean = !!UserStore.userToken

   useEffect(() => {
      isAuth ? history.push(ROUTES.home) : history.push(ROUTES.userAauthLogIn)
   }, [isAuth])

   const onSubmit = (data: object) => UserStore.loginUser(data)

   return (
      <div className={styles.contentPosition} >
         <div className={styles.content}>
            <div className={styles.logoPosition}>
               <h1 className={styles.logo}>DILA</h1>
            </div>
            <form className={styles.infoAccountBlock} onSubmit={handleSubmit(onSubmit)}>
               <input type="email" placeholder={t("logIn.emailPlaceholder")} className={styles.input} {...register("email", EMAIL_VALIDATION)} />
               {errors.email?.message && <p className={styles.errorPosition}>
                  {errors.email?.message}
               </p>}
               <input type={isPassword} placeholder={t("logIn.passwordPlaceholder")} className={styles.input} {...register("password", PASSWORD_VALIDATION)} />
               {errors.password?.message && <p className={styles.errorPosition}>
                  {errors.password?.message}
               </p>}
               <div className={styles.buttonPosition}>
                  <Button buttonStyle="fifthButtonStyle">
                     <span className={styles.buttonName}>
                        {t("logIn.logIn")}
                     </span>
                  </Button>
               </div>
               <div className={styles.or}>
                  <div className={styles.orLine} />
                  <span className={styles.orWord}>
                     {t("logIn.or")}
                  </span>
                  <div className={styles.orLine} />
               </div>
            </form>
            <Button onClick={() => setIsPassword(isPassword === "password" ? "text" : "password")}>
               <div className={`${styles.type} ${styles[`type-${isPassword}`]}`} />
            </Button>
            <Button><p className={styles.forgot}>{t("logIn.forgot")}</p></Button>
         </div>
         <div className={styles.changeField}>
            <p className={styles.changeSign}>{t("logIn.doNot")}
               <Button onClick={() => history.push(ROUTES.userAuthSignUp)}>
                  <span className={styles.buttonStyle}>{t("logIn.signUp")}</span>
               </Button>
            </p>
         </div>
      </div>
   )

}

export default LogInField