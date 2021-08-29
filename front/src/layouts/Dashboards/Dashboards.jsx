
import styles from "./Dashboards.module.scss"
import { Button, CreateListModalWindow, TaskBoard } from "../../components"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { useRef, useState } from "react"
import { useMediaQuery } from "../../hooks"
import { SMALL_DEVISCES } from "../../utils/constants"
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboards = ({ children, onClick }) => {

   const { lists } = BoardStore


   const searchValue = useRef(null)
   const [isListModalOpened, setIsListModalOpened] = useState(false)
   const [searchTitle, setSearchTitle] = useState('')

   const filteredList = lists.map(data => {
      const filteredTask = data.tasks.filter(neme => neme.text.includes(searchTitle))
      return { ...data, tasks: filteredTask }
   })

   const smallDevices = useMediaQuery(SMALL_DEVISCES)

   const sorry = () => toast.error("Sorry is Empty button!", {
      position: "top-center",
      draggable: true,
      autoClose: 3000,
      transition: Flip,
   });





   return (<div className={styles.mainBoardStyle}>
      <CreateListModalWindow isListModalOpened={isListModalOpened} onModalClose={() => setIsListModalOpened(false)} />
      <div className={styles.boardStyle}>
         <h2 className={styles.mainTitle}>Board</h2>
         <div className={styles.release}>
            <Button onClick={sorry} buttonStyle="thirdButtonStyle">Release</Button>
            <Button><div className={styles["three-dots"]} alt="Dots" /></Button>
            <ToastContainer />
         </div>
      </div>
      <div className={`${styles.create} ${smallDevices && styles.createSD}`}>
         <Button onClick={() => setIsListModalOpened(!isListModalOpened)} buttonStyle="thirdButtonStyle"><div className={styles.plus} alt="Plus Icon" />Create List</Button>
         <form className={`${styles.searchBoardArea} ${smallDevices && styles.searchBoardAreaSD}`} onChange={(e) => {
            e.preventDefault()
            setSearchTitle(searchValue.current.value)
         }}>
            <input type="text" placeholder="Task search..." className={styles.searchBoard} ref={searchValue} />
            <div className={styles.searchIcon} alt="Search Icon" />
            <Button onClick={(e) => e.preventDefault()}><div className={styles.delete} alt="Delete Icon" /></Button>
         </form>
      </div>
      <div className={styles.boardLists}>
         {filteredList.map((data) => <TaskBoard title={data.title} id={data.id} cardsData={data.tasks} key={data.id} />)}
      </div>
      {children}
   </div >
   );
}

export default observer(Dashboards)