
import styles from "./Dashboards.module.scss"
import { Button, CreateListModalWindow, Columns } from "../../components"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { useRef, useState } from "react"
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants"


const Dashboards = ({ children, onClick }) => {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);
   console.log(responsive);

   const { lists } = BoardStore


   const searchValue = useRef(null)
   const [isListModalOpened, setIsListModalOpened] = useState(false)
   const [searchTitle, setSearchTitle] = useState('')

   const filteredList = lists.map(data => {
      const filteredTask = data.tasks.filter(name => name.text.includes(searchTitle))
      return { ...data, tasks: filteredTask }
   })



   //TODO When my project is done delete it
   const sorry = () => toast.error("Sorry is Empty button!", {
      position: "top-center",
      draggable: true,
      autoClose: 3000,
      transition: Flip,
   });

   function handleOnDragEnd(result) {
      BoardStore.dragLists(result)
   }




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
      <div className={`${styles.create} ${styles[`create${responsive}`]}}`}>
         <Button onClick={() => setIsListModalOpened(!isListModalOpened)} buttonStyle="thirdButtonStyle"><div className={styles.plus} alt="Plus Icon" />Create List</Button>
         <form className={`${styles.searchBoardArea} ${styles[`searchBoardArea${responsive}`]}`} onChange={(e) => {
            e.preventDefault()
            setSearchTitle(searchValue.current.value)
         }}>
            <input type="text" placeholder="Task search..." className={styles.searchInput} ref={searchValue} />
            <div className={styles.searchIcon} alt="Search Icon" />
            <Button onClick={(e) => e.preventDefault()}><div className={styles.delete} alt="Delete Icon" /></Button>
         </form>
      </div>
      {/* <div className={styles.boardLists}>
         {filteredList.map((data) => <Columns title={data.title} id={data.id} cardsData={data.tasks} key={data.id} />)}
      </div> */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
         <Droppable droppableId="dragLists">
            {(provided) => (
               <div className={styles.boardLists} {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredList.map((data, index) => {
                     return (
                        <Draggable key={data.id} draggableId={data.id} index={index}>
                           {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                 <Columns title={data.title} id={data.id} cardsData={data.tasks} />
                              </div>
                           )}
                        </Draggable>
                     );
                  })}
                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </DragDropContext>
      {children}
   </div >
   );
}

export default observer(Dashboards)