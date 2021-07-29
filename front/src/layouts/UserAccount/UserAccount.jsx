import styles from "./UserAccount.module.scss"
// import { ReactComponent as UserAccountPhoto } from "../../assets/img/me.png"
import Button from "../../components/Button/Button"

const UserAccount = ({ UserAccountStyle }) => {
   return <div className={styles[UserAccountStyle]}>
      <div className={styles.userPhoto}>
         {/* <UserAccountPhoto></UserAccountPhoto> */}IMG
      </div>
      <div className={styles.form}>
         <input className={styles.input} type="text" placeholder="Name" />
         <input className={styles.input} type="text" placeholder="Email" />
         <input className={styles.input} type="text" placeholder="Where are you from?" />
         <Button buttonStyle="userAccountButton">Exit</Button>
      </div>
   </div>
}


export default UserAccount