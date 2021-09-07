import styles from "./UserAccount.module.scss"
import { Button } from "../../components";
const UserAccount = () => {
   return (<div className={styles.mainUserAccountStyle}>
      <div className={styles.userBlock}>
         <img className={styles.userPhoto} alt="User"></img>
      </div>
      <div className={styles.form}>
         <input className={styles.input} type="text" placeholder="Name" />
         <input className={styles.input} type="text" placeholder="Email" />
         <input className={styles.input} type="text" placeholder="Where are you from?" />
         <Button buttonStyle="thirdButtonStyle">Exit</Button>
      </div>
   </div>
   );
}


export default UserAccount