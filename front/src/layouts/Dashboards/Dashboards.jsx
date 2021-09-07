
import styles from "./Dashboards.module.scss"
import { Button, CreateListModalWindow, Columns } from "../../components"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { useRef, useState } from "react"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants"

const onDragEnd = (result, columns, setColumns) => {
   if (!result.destination) return;
   const { source, destination } = result;

   if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceTasks = [...sourceColumn.tasks];
      const destTasks = [...destColumn.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      setColumns({
         ...columns,
         [source.droppableId]: {
            ...sourceColumn,
            tasks: sourceTasks
         },
         [destination.droppableId]: {
            ...destColumn,
            tasks: destTasks
         }
      });
   } else {
      const column = columns[source.droppableId];
      console.log(column);
      const copiedTasks = [...column.tasks];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);
      setColumns({
         ...columns,
         [source.droppableId]: {
            ...column,
            tasks: copiedTasks
         }
      });
   }
}



const Dashboards = ({ children }) => {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

   const { lists } = BoardStore


   const searchValue = useRef("null")
   const [isListModalOpened, setIsListModalOpened] = useState(false)
   const [searchTitle, setSearchTitle] = useState('')

   const filteredList = lists.map(data => {
      const filteredTask = data.tasks.filter(name => name.text.includes(searchTitle))
      return { ...data, tasks: filteredTask }
   })

   // const [columns, setColumns] = useState(filteredList)

   // function handleOnDragEnd(result) {
   //    BoardStore.dragLists(result)
   // }


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
      <div className={styles.boardLists}>
         {filteredList.map((data) => <Columns title={data.title} id={data.id} cardsData={data.tasks} key={data.id} />)}
      </div>
      {/* <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
         <div className={styles.boardLists}>
            {Object.entries(columns).map(([columnId, column]) => {
               // console.log("Column", column);
               return (
                  <Columns cardsData={column.tasks} title={column.title} key={column.id} id={column.id} />
               )
            })}
         </div>
      </DragDropContext> */}
      {children}
   </div >
   );
}

export default observer(Dashboards)