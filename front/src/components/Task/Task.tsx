import React, { useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import { Button, DeleteTaskModal, ChangeTaskModal } from "..";
import { observer } from "mobx-react";
import styles from "./Task.module.scss"

interface ITaskProps {
  text: string,
  label?: string,
  labelStyle?: string,
  taskState?: string,
  priority?: string,
  index: number,
  id: string,
  columnId: string
}

// !!! ToDo Draggable

const Task: React.FC<ITaskProps> = ({ text, label, labelStyle, taskState, priority, index, id, columnId }) => {


  const [isOpened, setIsOpened] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)


  return (
    <>
      <ChangeTaskModal id={id} columnId={columnId}
        onModalClose={() => setIsModalOpened(false)}
        isModalOpened={isModalOpened} />
      <DeleteTaskModal id={id} columnId={columnId}
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
                    <Button onClick={() => setIsOpened(!isOpened)}>
                      <div className={styles.delete} />
                    </Button>
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

export default observer(Task);