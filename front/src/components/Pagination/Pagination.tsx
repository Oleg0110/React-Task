import styles from "./Pagination.module.scss"
import { observer } from "mobx-react"
import { ROUTES } from "../../utils/constants"
import { useHistory } from "react-router"
import { Button } from ".."
import { toast } from "react-toastify"
import { UserStore } from "../../stores"
import { toJS } from "mobx"
import { urlValue } from "../../utils/functions"
import React, { useEffect, useState } from "react"

interface IPageNumbers {
   users: {
      pageNumbers: Array<number>
   }
}

interface IPagination {
   usersOnPage: number,
   setCurrentPage: (number: number) => void,
   currentPage: number,
}


// !!! ToDo useState

const Pagination: React.FC<IPagination> = ({ usersOnPage, setCurrentPage, currentPage }) => {

   const history = useHistory()

   const onPageChanged = (number?: number) => {

      number && setCurrentPage(number)

      UserStore.asyncGetUsers(number, usersOnPage)

      history.push(`${ROUTES.people}?page=${number}&count=${usersOnPage}`)
   }

   const page = (): number => history.location.search ? +urlValue(history.location.search).page : 1

   // !!! ToDo any

   const { users }: IPageNumbers = UserStore as any

   const pageNumbers = users.pageNumbers || []

   const [visibleButtons, setVisibleButtons] = useState([]);

   // !!! ToDo

   // useEffect(() => {

   //    const dots = "..."
   //    const dotsLeft = "... "
   //    const dotsRight = " ..."

   //    let visiblePages = [...visibleButtons];

   //    if (pageNumbers.length < 6) {
   //       visiblePages = pageNumbers
   //    }
   //    else if (currentPage >= 1 && currentPage <= 3) {
   //       visiblePages = [1, 2, 3, 4, dots, pageNumbers.length]
   //    }
   //    else if (currentPage === 4) {
   //       let sliced = pageNumbers.slice(0, 5)
   //       visiblePages = [...sliced, dots, pageNumbers.length]
   //    }
   //    else if (currentPage > 4 && currentPage < pageNumbers.length - 2) {
   //       let sliced1 = pageNumbers.slice(currentPage - 2, currentPage)
   //       let sliced2 = pageNumbers.slice(currentPage, currentPage + 1)
   //       visiblePages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, pageNumbers.length])
   //    }
   //    else if (currentPage > pageNumbers.length - 3) {
   //       let sliced = pageNumbers.slice(pageNumbers.length - 4)
   //       visiblePages = ([1, dotsLeft, ...sliced])
   //    }

   //    setVisibleButtons(visiblePages)
   // }, [users])

   const nextPage = () => {

      if (pageNumbers.length !== currentPage) {

         const page = +currentPage + 1

         UserStore.asyncGetUsers(page, usersOnPage)
         history.push(`${ROUTES.people}?page=${page}&count=${usersOnPage}`)

         setCurrentPage(page)
      } else {
         toast.error("last page")

         const page = pageNumbers.length

         UserStore.asyncGetUsers(page, usersOnPage)
         history.push(`${ROUTES.people}?page=${page}&count=${usersOnPage}`)

         setCurrentPage(page)
      }
   }

   const prevPage = () => {
      if (currentPage > 1) {

         const page = currentPage - 1

         UserStore.asyncGetUsers(page, usersOnPage)
         history.push(`${ROUTES.people}?page=${page}&count=${usersOnPage}`)

         setCurrentPage(page)
      } else {
         toast.error("first page")

         const page = 1

         UserStore.asyncGetUsers(page, usersOnPage)
         history.push(`${ROUTES.people}?page=${page}&count=${usersOnPage}`)

         setCurrentPage(page)
      }
   }

   return (
      <div className={styles.numberField}>
         <div className={styles.backFon}>
            <ul className={styles.pagination}>
               {/* {visibleButtons.map((number, index) => {
                  return <span key={index} className={page() === number ? styles.currentNumber : styles.number}
                     onClick={() => onPageChanged(number)}
                  >
                     {number}
                  </span>
               })} */}
            </ul>
         </div >
         <div className={styles.arrowBack}>
            <div className={styles.arrowField}>
               <div className={styles.buttonsField}>
                  <Button onClick={prevPage}>
                     <div className={styles.prev} />
                  </Button>
                  <Button onClick={nextPage} >
                     <div className={styles.next} />
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default observer(Pagination)