import styles from "./TaskBoard.module.scss"
import Button from "../Button/Button"
import AddTaskModalWindow from "../AddTaskModalWindow/AddTaskModalWindow"
import { TaskCard } from ".."
import { useState } from "react"
import { observer } from "mobx-react"
// import CreateListStore from "../../stores/CreateListStore/CreateListStore"


const TaskBoard = ({ children, title, cardsData }) => {

   const [isTaskModalOpened, setIsTaskModalOpened] = useState(false)

   // < TaskCard priority = "medium" taskState = "done" label = "SPACE TRAVEL PARTNERS" />

   return (
      <div>
         <div className={styles.taskBoard}>
            <AddTaskModalWindow isModalOpened={isTaskModalOpened} onModalClose={() => setIsTaskModalOpened(false)} />
            <div className={styles.taskInfo}>
               <p className={styles.taskTitle}>{title}</p>
               <Button onClick={() => setIsTaskModalOpened(!isTaskModalOpened)}><div className={styles.plus} alt="Plus Icon" /></Button>
            </div>
            <div className={styles.scroll}>
               {children}
               {cardsData?.map((data) => <TaskCard text={data.text} priority={data.priority} taskState={data.taskState} label={data.label} key={data.id} />)}
            </div>
         </div >
      </div>)
}


export default observer(TaskBoard)