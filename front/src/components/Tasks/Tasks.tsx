import React, { useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import { Button, DeleteTaskModal, ChangeTaskModal } from "..";
import { observer } from "mobx-react";
import styles from "./Tasks.module.scss"

interface ITasks {
   text: string,
   label?: string,
   labelStyle?: string,
   taskState?: string,
   priority?: string,
   index: number,
   id: string,
   listId: string
}

// !!! ToDo Draggable
// !!! ToDo ALT

const Tasks: React.FC<ITasks> = ({ text, label, labelStyle, taskState, priority, index, id, listId }) => {


   const [isOpened, setIsOpened] = useState<boolean>(false)
   const [isModalOpened, setIsModalOpened] = useState<boolean>(false)


   return (
      <>
         <ChangeTaskModal id={id} listId={listId}
            onModalClose={() => setIsModalOpened(false)}
            isModalOpened={isModalOpened} />
         <DeleteTaskModal id={id} listId={listId}
            onModalClose={() => setIsOpened(false)}
            isModalOpened={isOpened} />
         <Draggable draggableId={id} index={index} key={id}>
            {(provided, snapshot) => {
               return (
                  <div className={styles.back}
                     ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                  >
                     <div className={styles.taskCard} style={{
                        background: snapshot.isDragging ? "#f2ca90" : "#fff",
                     }}>
                        <p className={styles.cardText} onClick={() => setIsModalOpened(!isModalOpened)}>{text}</p>
                        <p className={labelStyle ? styles[labelStyle] : ""}>{label}</p>
                        <div className={styles.taskInfo}>
                           <div className={styles.stateTable}>
                              <div className={`${styles.taskState} ${styles[`taskState-${taskState}`]}`} />
                              <div className={`${styles.priority} ${styles[`priority-${priority}`]}`} />
                           </div>
                           <div className={styles.userPhotoBlock}>
                              <Button onClick={() => setIsOpened(!isOpened)}><div className={styles.delete}
                              // alt="Delete" 
                              /></Button>
                           </div>
                        </div>
                     </div >
                     {/* {provided.placeholder} */}
                  </div>
               )
            }}
         </Draggable >
      </>
   )
}

export default observer(Tasks);