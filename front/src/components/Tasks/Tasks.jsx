import styles from "./Tasks.module.scss"


const Tasks = ({ text, label, labelStyle, taskState, priority, alt, userPhoto }) => {
   return (
      <div className={styles.back}>
         <div className={styles.taskCard}>
            <p className={styles.cardText}>{text}</p>
            <p className={styles[labelStyle]}>{label}</p>
            <div className={styles.taskInfo}>
               <div className={styles.stateTable}>
                  <div className={`${styles.taskState} ${styles[`taskState-${taskState}`]}`} />
                  <div className={`${styles.priority} ${styles[`priority-${priority}`]}`} />
               </div>
               <div className={styles.userPhotoBlock}>
                  <div className={`${styles.userPhoto} ${styles[`userPhoto-${userPhoto}`]}`} alt={alt} />
               </div>
            </div>
         </div >
      </div>
   )
}

export default Tasks