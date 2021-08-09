import styles from "./TaskBoard.module.scss"


const TaskBoard = ({ children, title }) => {
   return (<div className={styles.taskBoard}>
      <p className={styles.taskTitle}>{title}</p>
      <div className={styles.scroll}>
         {children}
      </div>
   </div >

   )

}

export default TaskBoard