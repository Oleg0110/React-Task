import styles from "./Pagination.module.scss"
import { observer } from "mobx-react"
import { ROUTES } from "../../utils/constants"
import { useHistory } from "react-router"
import { Button } from ".."
import { toast } from "react-toastify"
import { UserStore } from "../../stores"

const Pagination = ({ usersOnPage, totalUsers, paginate, setCurrentPage, currentPage }) => {

   const history = useHistory()

   const onPageChanged = (number) => {
      UserStore.asyncGetUsers(number, usersOnPage)
      paginate(number)
      history.push(`${ROUTES.people}?page=${number}&count=${usersOnPage}`)
   }

   const pageNumbers = []

   for (let i = 1; i <= Math.ceil(totalUsers / usersOnPage); i++) {
      pageNumbers.push(i)
   }

   const nextPage = () => setCurrentPage(next => {
      if (pageNumbers.length !== next) {

         const page = next + 1

         UserStore.asyncGetUsers(page, usersOnPage)
         history.push(`${ROUTES.people}?page=${page}&count=${usersOnPage}`)

         return page
      }
      toast.error("last page")

      const lastPage = pageNumbers.length

      UserStore.asyncGetUsers(lastPage, usersOnPage)
      history.push(`${ROUTES.people}?page=${lastPage}&count=${usersOnPage}`)

      return lastPage

   })

   const prevPage = () => setCurrentPage(next => {
      if (next > 1) {

         const page = next - 1

         UserStore.asyncGetUsers(page, usersOnPage)
         history.push(`${ROUTES.people}?page=${page}&count=${usersOnPage}`)

         return page
      }
      toast.error("first page")

      const page = 1

      UserStore.asyncGetUsers(page, usersOnPage)
      history.push(`${ROUTES.people}?page=${page}&count=${usersOnPage}`)

      return page

   })

   return (
      <div className={styles.numberField}>
         <div className={styles.backFon}>
            <ul className={styles.pagination}>
               {pageNumbers.map(number => {
                  return <span key={number} className={currentPage === number ? styles.currentNumber : styles.number}
                     onClick={() => onPageChanged(number)}
                  >
                     {number}
                  </span>
               })}
            </ul>
         </div >
         <div className={styles.arrowBack}>
            <div className={styles.arrowField}>
               <div className={styles.buttonsField}>
                  <Button onClick={prevPage}><div className={styles.prev} /></Button>
                  <Button onClick={nextPage} ><div className={styles.next} /></Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default observer(Pagination)