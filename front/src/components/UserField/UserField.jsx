import styles from "./UserField.module.scss"
import { Button } from '..';
import { UserStore } from "../../stores";
import { observer } from "mobx-react"
import { useHistory } from "react-router";
import { useEffect } from "react";

const UserField = ({ isOpened, onModalClose }) => {


   const { user } = UserStore
   const history = useHistory()

   useEffect(() => {
      UserStore.setUser()
   }, [])

   return (
      <div className={isOpened ? styles.sidebar : styles.opened}>
         <div className={styles.content}>
            <h1 className={styles.title}>Acount</h1>
            <Button onClick={onModalClose}>
               <div className={styles.closeIcon} alt="Close" />
            </Button>
            <div className={styles.infoField}>
               <div className={styles.userPhoto} alt="User" />
               {user.map((data) => <div className={styles.userInfo} key={data.id}>
                  <p className={styles.name}>{data.name}</p>
                  <p className={styles.email}>{data.email}</p>
               </div>)}
            </div>
         </div>
         <div className={styles.buttonField}>
            <Button onClick={() => {
               history.push("/user/sign-up")
               onModalClose()
            }} buttonStyle="userFieldButtonStyle">
               <span className={styles.buttonSign}>Sign up</span>
            </Button>
            <Button onClick={() => {
               history.push("/user/log-in")
               onModalClose()
            }} buttonStyle="userFieldButtonStyle">
               <span className={styles.buttonLog}>Log In</span>
            </Button>
            <Button buttonStyle="userFieldButtonStyle"><p className={styles.buttonExit}>Exit</p></Button>
         </div>
      </div>
   )
}

export default observer(UserField)