
import styles from "./Dashboards.module.scss"
import { Button, CreateListModalWindow, TaskBoard } from "../../components"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { useRef, useState } from "react"


const Dashboards = ({ children, onClick }) => {

   const searchValue = useRef(null)
   const [isListModalOpened, setIsListModalOpened] = useState(false)
   const [searchTitle, setSearchTitle] = useState('')

   const { lists } = BoardStore

   // const foundBoard = lists.filter(found => Object.values(found))

   // const foundBoard = lists.forEach(function (data) {
   //    data.
   // })


   return (<div className={styles.mainBoardStyle}>
      <CreateListModalWindow isListModalOpened={isListModalOpened} onModalClose={() => setIsListModalOpened(false)} />
      <div className={styles.boardStyle}>
         <h2 className={styles.mainTitle}>Board</h2>
         <div className={styles.release}>
            <Button buttonStyle="thirdButtonStyle">Release</Button>
            <Button><div className={styles["three-dots"]} alt="Dots" /></Button>
         </div>
      </div>
      <div className={styles.create}>
         <Button onClick={() => setIsListModalOpened(!isListModalOpened)} buttonStyle="thirdButtonStyle"><div className={styles.plus} alt="Plus Icon" />Create List</Button>
         <form className={styles.searchBoardArea} onChange={(e) => {
            e.preventDefault()
            setSearchTitle(searchValue.current.value)
         }}>
            <input type="text" placeholder="Task search..." className={styles.searchBoard} ref={searchValue} />
            <div className={styles.searchIcon} alt="Search Icon" />
            <Button onClick={(e) => e.preventDefault()}><div className={styles.delete} alt="Delete Icon" /></Button>
         </form>
      </div>
      <div className={styles.boardLists}>
         {lists.map((data) => <TaskBoard title={data.title} id={data.id} cardsData={data.tasks} key={data.id} />)}
      </div>
      {children}
   </div >
   );
}

export default observer(Dashboards)