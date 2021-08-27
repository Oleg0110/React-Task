import styles from "./UserAccount.module.scss"
import userPhoto from "../../assets/img/me.png"
import { Button } from "../../components";
const UserAccount = () => {
   return (<div className={styles.mainUserAccountStyle}>
      <div className={styles.userBlock}>
         <img className={styles.userPhoto} src={userPhoto} alt="User Photo"></img>
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