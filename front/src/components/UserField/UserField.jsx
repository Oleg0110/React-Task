import styles from "./UserField.module.scss"
import { Button } from '..';
import { UserStore } from "../../stores";
import { observer } from "mobx-react"
import { useHistory } from "react-router";
import { ROUTES } from "../../utils/constants";

const UserField = ({ isOpened, onModalClose }) => {


   const { user } = UserStore
   const { name, email } = user

   const history = useHistory()

   const logout = () => {
      localStorage.removeItem("userData");
      onModalClose()
      window.location.reload()
   }

   return (
      <div className={isOpened ? styles.sidebar : styles.opened}>
         <div className={styles.content}>
            <h1 className={styles.title}>Acount</h1>
            <Button onClick={onModalClose}>
               <div className={styles.closeIcon} alt="Close" />
            </Button>
            <div className={styles.infoField}>
               <div className={styles.userPhoto} alt="User" />
               <div className={styles.userInfo}>
                  <p className={styles.name}>{name}</p>
                  <p className={styles.email}>{email}</p>
               </div>
            </div>
         </div>
         <div className={styles.buttonField}>
            <Button onClick={() => {
               history.push(ROUTES.userAuthSignUp)
               onModalClose()
            }} buttonStyle="userFieldButtonStyle">
               <span className={styles.buttonSign}>Sign up</span>
            </Button>
            <Button onClick={() => {
               history.push(ROUTES.userAauthLogIn)
               onModalClose()
            }} buttonStyle="userFieldButtonStyle">
               <span className={styles.buttonLog}>Log In</span>
            </Button>
            <Button buttonStyle="userFieldButtonStyle" onClick={logout}><p className={styles.buttonExit}>Exit</p></Button>
         </div>
      </div>
   )
}

export default observer(UserField)