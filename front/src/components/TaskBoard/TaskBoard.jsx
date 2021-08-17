import styles from "./TaskBoard.module.scss"
import { Button } from ".."
import { CreateTaskModalWindow } from ".."
import { TaskCard } from ".."
import { useState } from "react"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"

const TaskBoard = ({ children, title, id, cardsData }) => {

   const [isTaskModalOpened, setIsTaskModalOpened] = useState(false)

   const { lists } = BoardStore


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
            <div className={styles.scroll}>
               {children}
               {cardsData?.map((data) => <TaskCard text={data.text} priority={data.priority} taskState={data.taskState} label={data.label} key={data.id} />)}
            </div>
         </div >
      </div>)
}


export default observer(TaskBoard)