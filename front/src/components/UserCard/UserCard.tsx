import React from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
// import styles from "./UsersCard.module.scss"

interface IUserCard {
   name: string,
   email: string
}

// !!! ToDo

const UserCard: React.FC<IUserCard> = ({ name, email }) => {

   const { t } = useTranslation();

   const copyEmail = async (email: string) => {
      if (email === undefined) {
         toast.error('Failed to copy!')
      } else {
         await navigator.clipboard.writeText(email);
         toast.success(`Copied ${email}`)
      }
   };


   return (<>
      {/* // <div className={styles.back}>
      //    <div onClick={() => copyEmail(email)} className={styles.userCard}>
      //       <div className={styles.userBlock}>
      //          <div className={styles.userPhoto}></div>
      //          <div className={styles.infoField}>
      //             <p className={styles.userName}>{name}</p>
      //             <p className={styles.userEmail}>{email}</p>
      //          </div>
      //       </div>
      //       <div className={styles.copy}>
      //          <p>{t("people.click")}</p>
      //       </div>
      //    </div>
      // </div> */}
   </>
   )
}

export default observer(UserCard)