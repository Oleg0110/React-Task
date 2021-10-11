import { Pagination, UserCard } from "../../components"
import styles from "./People.module.scss"
import { useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE, ROUTES } from "../../utils/constants";
import { UserStore } from "../../stores";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { urlValue } from "../../utils/functions";
import { toJS } from "mobx";

interface IUsers {
   users: {
      currentUser: Array<number>,
      allUsers: number
   }
}

interface IUser {
   name: string | '',
   email: string | '',
   _id: string | ''
}

interface ICurrentUser {
   currentUser: Array<IUser>
}


const People: React.FC = () => {

   const [currentPage, setCurrentPage] = useState(1)
   const [usersOnPage] = useState(2)

   const history = useHistory()

   useEffect(() => {

      if (history.location.search) {
         const page = +urlValue(history.location.search).page

         setCurrentPage(page)

         UserStore.asyncGetUsers(page, usersOnPage)

      } else {
         UserStore.asyncGetUsers(currentPage, usersOnPage)
      }


   }, [])

   // !!! ToDo any
   const { users }: IUsers = UserStore as any
   // !!! ToDo
   const currentUser = users.currentUser || []
   const allUsers: number = users.allUsers

   const { t } = useTranslation();

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

   const projectsCount = (): string => `${allUsers === 0 ? styles.countNone : styles.count}`

   return (
      <div className={styles.mainBlock}>
         <h1 className={styles.title}>{t("people.title")}<span className={projectsCount()}>{allUsers}</span></h1>
         <div className={styles.peopleField}>
            <div className={`${styles.backFon} ${styles[`backFon${responsive}`]}`}>
               <div className={styles.scroll}>
                  {/* {currentUser.map((data) => <UserCard name={data.name} email={data.email} key={data._id} />)} */}
               </div>
            </div>
            <Pagination
               usersOnPage={usersOnPage}
               setCurrentPage={setCurrentPage} currentPage={currentPage} />
         </div>
      </div>

   )
}


export default observer(People)