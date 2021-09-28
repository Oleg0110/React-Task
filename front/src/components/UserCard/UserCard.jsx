import { toast } from "react-toastify";
import styles from "./UserCard.module.scss"


const UserCard = ({ name, email }) => {

   const copyEmail = async (copyMe) => {
      if (copyMe === undefined) {
         toast.error('Failed to copy!')
      } else {
         await navigator.clipboard.writeText(copyMe);
         toast.success(`Copied ${copyMe}`)
      }
   };


   return (
      <div className={styles.back}>
         <div onClick={() => copyEmail(email)} className={styles.userCard}>
            <div className={styles.userBlock}>
               <div className={styles.userPhoto}></div>
               <div className={styles.infoField}>
                  <p className={styles.userName}>{name}</p>
                  <p className={styles.userEmail}>{email}</p>
               </div>
            </div>
            {/* <Button onClick={() => copyEmail(email)} buttonStyle="thirdButtonStyle">Copy Email</Button> */}
         </div>
      </div>
   )
}

export default UserCard