
import styles from "./Dashboards.module.scss"
import { Button, CreateListModalWindow, Columns } from "../../components"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import { DragDropContext } from 'react-beautiful-dnd';
import { useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants"



const Dashboards = ({ children }) => {

   useEffect(() => {
      BoardStore.asyncGetLists()
   }, []);

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

   const { lists } = BoardStore


   const searchValue = useRef(null)
   const [isListModalOpened, setIsListModalOpened] = useState(false)
   const [searchTitle, setSearchTitle] = useState('')

   // const filteredList = lists.map(data => {
   //    const filteredTask = data.tasks.filter(name => name.text.includes(searchTitle))
   //    return { ...data, tasks: filteredTask }
   // })


   function handleOnDragEnd(result) {
      BoardStore.dragLists(result)
   }


   return (<div className={styles.mainBoardStyle}>
      <CreateListModalWindow isListModalOpened={isListModalOpened} onModalClose={() => setIsListModalOpened(false)} />
      <div className={styles.boardStyle}>
         <h2 className={styles.mainTitle}>Board</h2>
         <div className={styles.release}>
            <Button buttonStyle="thirdButtonStyle">Release</Button>
            <Button><div className={styles["three-dots"]} alt="Dots" /></Button>
         </div>
      </div>
      <div className={`${styles.create} ${styles[`create${responsive}`]}}`}>
         <div className={`${styles.createButtonPosition} ${styles[`createButtonPosition${responsive}`]}`}>
            <Button onClick={() => setIsListModalOpened(!isListModalOpened)} buttonStyle="thirdButtonStyle">
               <div className={styles.plus} alt="Plus Icon" />Create List</Button>
         </div>
         <form className={styles.searchBoardArea} onChange={(e) => {
            e.preventDefault()
            setSearchTitle(searchValue.current.value)
         }}>
            <input type="text" placeholder="Task search..." className={styles.searchInput} ref={searchValue} />
            <div className={styles.searchIcon} alt="Search Icon" />
            <Button onClick={(e) => e.preventDefault()}><div className={styles.delete} alt="Delete Icon" /></Button>
         </form>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
         <div className={styles.boardLists}>
            {lists.map((data, index) => {
               return (
                  <Columns cardsData={data.tasks} title={data.title} key={data._id} id={data._id} index={index} />
               )
            })}
         </div>
      </DragDropContext>
      {children}
   </div >
   );
}

export default observer(Dashboards)