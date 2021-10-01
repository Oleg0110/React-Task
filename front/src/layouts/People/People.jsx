import { UserCard } from "../../components"
import styles from "./People.module.scss"
import { useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants";
import { UserStore } from "../../stores";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Pagination from "../../components/Pagination/Pagination";

const People = () => {

   const [currentPage, setCurrentPage] = useState(1)
   const [usersOnPage] = useState(2)

   useEffect(() => {
      UserStore.asyncGetUsers()
   })

   const { users } = UserStore

   const lastUserIndex = currentPage * usersOnPage
   const firsUserIndex = lastUserIndex - usersOnPage
   const currentUser = users.slice(firsUserIndex, lastUserIndex)

   const paginate = pageNumber => setCurrentPage(pageNumber)

   const { t } = useTranslation();

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

   const projectsCount = () => {
      return `${UserStore.users.length === 0 ? styles.countNone : styles.count}`
   }

   return (
      <div className={styles.mainBlock}>
         <h1 className={styles.title}>{t("people.title")}<span className={projectsCount()}>{UserStore.users.length}</span></h1>
         <div className={styles.peopleField}>
            <div className={`${styles.backFon} ${styles[`backFon${responsive}`]}`}>
               <div className={styles.scroll}>
                  {currentUser.map((data) => <UserCard name={data.name} email={data.email} key={data._id} />)}
               </div>
            </div>
            <Pagination
               usersOnPage={usersOnPage} totalUsers={users.length}
               paginate={paginate} setCurrentPage={setCurrentPage}
               currentPage={currentPage} />
         </div>
      </div>

   )
}


export default observer(People)