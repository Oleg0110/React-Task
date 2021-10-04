import { toast } from "react-toastify";
import styles from "./UserCard.module.scss"
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";


const UserCard = ({ name, email }) => {

   const { t } = useTranslation();

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
            <div className={styles.copy}>
               <p>{t("people.click")}</p>
            </div>
         </div>
      </div>
   )
}

export default observer(UserCard)