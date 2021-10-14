import React, { useEffect, useState } from "react";
import { Pagination, UserCard } from "../../components"
import { useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants";
import { UserStore } from "../../stores";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { urlValue } from "../../utils/functions";
import styles from "./People.module.scss"
import { ICurrentUsersProps } from "utils/interFace";

// interface IUsersProps {
//    currentUser: Array<ICurrentUsersProps>,
//    pageNumbers: Array<number>,
//    allUsers: number
// }




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

  }, [currentPage, history.location.search])

  // !!! ToDo any
  const { users } = UserStore as any

  const currentUser: ICurrentUsersProps[] = users.currentUser || []
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
            {currentUser.map((data) => <UserCard name={data.name} email={data.email} key={data._id} />)}
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