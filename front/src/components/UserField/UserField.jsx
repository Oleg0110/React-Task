import styles from "./UserField.module.scss"
import { Button } from '..';
import { UserStore } from "../../stores";
import { observer } from "mobx-react"
import { useHistory } from "react-router";
import { ROUTES } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks";

const UserField = ({ isOpened, onModalClose }) => {

   const { t } = useTranslation();

   const { user } = UserStore
   const { name, email } = user

   const history = useHistory()

   const logout = () => {
      localStorage.removeItem("userData");
      onModalClose()
      history.push(ROUTES.home)
      window.location.reload()
   }

   const { token } = useAuth()
   const isAuthenticated = !!token

   const userInfo = () => {
      return isAuthenticated ? styles.infoField : styles.infoFieldNone
   }

   const authentication = () => {
      return !isAuthenticated ? styles.buttons : styles.buttonsNone
   }

   const exit = () => {
      return isAuthenticated ? styles.exit : styles.exitNone
   }

   const sidebarHeight = () => {
      return !isAuthenticated ? styles.sidebar : styles.sidebarHeight
   }

   const userPhoto = () => {
      return !isAuthenticated ? styles.empty : styles.userPhoto
   }

   return (
      <div className={isOpened ? sidebarHeight() : styles.opened}>
         <div className={styles.content}>
            <h1 className={styles.title}>{t("userField.title")}</h1>
            <Button onClick={onModalClose}>
               <div className={styles.closeIcon} alt="Close" />
            </Button>
            <div className={userInfo()}>
               <div className={userPhoto()} alt="User" />
               <div className={styles.userInfo}>
                  <p className={styles.name}>{name}</p>
                  <p className={styles.email}>{email}</p>
               </div>
            </div>
         </div>
         <div className={styles.buttonField}>
            <div className={authentication()}>
               <Button onClick={() => {
                  history.push(ROUTES.userAuthSignUp)
                  onModalClose()
               }} buttonStyle="userFieldButtonStyle">
                  <span className={styles.buttonSign}>{t("userField.signUp")}</span>
               </Button>
               <Button onClick={() => {
                  history.push(ROUTES.userAauthLogIn)
                  onModalClose()
               }} buttonStyle="userFieldButtonStyle">
                  <span className={styles.buttonLog}>{t("userField.logIn")}</span>
               </Button>
            </div>
            <div className={exit()}>
               <Button buttonStyle="userFieldButtonStyle" onClick={logout}>
                  <p className={styles.buttonExit}>
                     {t("userField.exit")}
                  </p>
               </Button>
            </div>
         </div>
      </div>
   )
}

export default observer(UserField)