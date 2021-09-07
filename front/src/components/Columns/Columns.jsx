import styles from "./Columns.module.scss"
import { Button, Tasks, CreateTaskModalWindow } from ".."
import { useState } from "react"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Columns = ({ children, title, id, cardsData }) => {

   const [isTaskModalOpened, setIsTaskModalOpened] = useState(false)

   const handleOnDragEnd = (result) => {
      BoardStore.dragInList(result, id)
   }

   return (
      <div>
         <div className={styles.taskBoard}>
            <CreateTaskModalWindow id={id} isModalOpened={isTaskModalOpened} onModalClose={() => setIsTaskModalOpened(false)} />
            <div className={styles.taskInfo}>
               <p className={styles.taskTitle}>{title}</p>
               <Button onClick={() => {
                  setIsTaskModalOpened(!isTaskModalOpened);
               }}><div className={styles.plus} alt="Plus Icon" /></Button>
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
               <Droppable droppableId="cards">
                  {(provided) => (
                     <div className={styles.scroll} {...provided.droppableProps} ref={provided.innerRef}>
                        {children}
                        {cardsData?.map((data, index) => {
                           return (
                              <Draggable key={data.id} draggableId={data.id} index={index}>
                                 {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                       <Tasks text={data.text} />
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
         </div >
      </div>
      //    <div>
      //    <Droppable droppableId={id}>
      //       {(provided) => {
      //          return (
      //             <div
      //                className={styles.taskBoard}
      //                {...provided.droppableProps}
      //                ref={provided.innerRef}
      //             >
      //                <CreateTaskModalWindow id={id} isModalOpened={isTaskModalOpened} onModalClose={() => setIsTaskModalOpened(false)} />
      //                <div className={styles.taskInfo}>
      //                   <p className={styles.taskTitle}>{title}</p>
      //                   <Button onClick={() => setIsTaskModalOpened(!isTaskModalOpened)}><div className={styles.plus} alt="Plus Icon" /></Button>
      //                </div>
      //                   {cardsData?.map((data, index) => {
      //                      // console.log(data);
      //                      return (
      //                         <Tasks text={data.text} index={index} key={data.id} id={data.id} />
      //                      )
      //                   })}
      //                {provided.placeholder}
      //             </div>
      //          )
      //       }}
      //    </Droppable>
      // </div>
   )
}


export default observer(Columns)