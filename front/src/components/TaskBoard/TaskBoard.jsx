import styles from "./TaskBoard.module.scss"
import Button from "../Button/Button"
import AddTaskModalWindow from "../AddTaskModalWindow/AddTaskModalWindow"
import { useState } from "react"
// import CreateListStore from "../../stores/CreateListStore/CreateListStore"


const TaskBoard = ({ children, title }) => {

   const [isTaskModalOpened, setIsTaskModalOpened] = useState(false)
   // let { list } = CreateListStore

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
            </div>
         </div >
      </div>)
}


export default TaskBoard