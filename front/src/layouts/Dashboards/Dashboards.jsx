
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

   // const foundBoard = 

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
         <div className={styles.searchQuick}>
            <form className={styles.searchBoardArea} onChange={(e) => {
               e.preventDefault()
               setSearchTitle(searchValue.current.value)
            }}>
               <input type="text" className={styles.searchBoard} ref={searchValue} />
               <div className={styles.searchIcon} alt="Search Icon" />
            </form>
            <Button ><span className={styles.filtersButton}>Quick Filters<div className={styles.chevronIcon} alt="Arrow" /></span></Button>
         </div>
      </div>
      <div className={styles.boardLists}>
         {lists.map((data) => <TaskBoard title={data.title} id={data.id} cardsData={data.tasks} key={data.id} />)}
      </div>
      {children}
   </div >
   );
}

export default observer(Dashboards)