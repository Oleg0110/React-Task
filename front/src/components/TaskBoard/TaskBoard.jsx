import styles from "./TaskBoard.module.scss"
import { Button } from ".."
import { CreateTaskModalWindow } from ".."
import { TaskCard } from ".."
import { useState } from "react"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"

const TaskBoard = ({ children, title, cardsData }) => {

   const [isTaskModalOpened, setIsTaskModalOpened] = useState(false)

   return (
      <div>
         <div className={styles.taskBoard}>
            <CreateTaskModalWindow isModalOpened={isTaskModalOpened} onModalClose={() => setIsTaskModalOpened(false)} />
            <div className={styles.taskInfo}>
               <p className={styles.taskTitle}>{title}</p>
               <Button onClick={() => setIsTaskModalOpened(!isTaskModalOpened)}><div className={styles.plus} alt="Plus Icon" /></Button>
            </div>
            <div className={styles.scroll}>
               {children}
               {cardsData?.map((data, index) => <TaskCard text={data.text} priority={data.priority} taskState={data.taskState} label={data.label} key={index} />)}
            </div>
         </div >
      </div>)
}


export default observer(TaskBoard)