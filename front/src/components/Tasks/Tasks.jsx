import styles from "./Tasks.module.scss"
import { Draggable } from 'react-beautiful-dnd';
import { Button, DeleteModalWindow } from "..";
import { useState } from "react";


const Tasks = ({ text, label, labelStyle, taskState, priority, index, id }) => {

   const [isOpened, setIsOpened] = useState(false)

   return (
      <>
         <Draggable draggableId={id} index={index} key={id}>
            {(provided, snapshot) => {
               return (
                  <div className={styles.back}
                     ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                  >
                     <DeleteModalWindow onModalClose={() => setIsOpened(false)} isModalOpened={isOpened} />
                     <div className={styles.taskCard} style={{
                        background: snapshot.isDragging ? "#f2ca90" : "#fff",
                     }}>
                        <p className={styles.cardText}>{text}</p>
                        <p className={styles[labelStyle]}>{label}</p>
                        <div className={styles.taskInfo}>
                           <div className={styles.stateTable}>
                              <div className={`${styles.taskState} ${styles[`taskState-${taskState}`]}`} />
                              <div className={`${styles.priority} ${styles[`priority-${priority}`]}`} />
                           </div>
                           <div className={styles.userPhotoBlock}>
                              <Button onClick={() => setIsOpened(!isOpened)}><div className={styles.delete} alt="Delete" /></Button>
                           </div>
                        </div>
                     </div >
                     {provided.placeholder}
                  </div>
               )
            }}
         </Draggable >
      </>
   )
}

export default Tasks