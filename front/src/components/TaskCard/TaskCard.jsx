import styles from "./TaskCard.module.scss"
import bell from "../../assets/icon/bell.svg"
import bell2 from "../../assets/icon/bell.svg"
import bell3 from "../../assets/icon/bell.svg"


const TaskCard = (props) => {
   return (<div className={styles.taskCard}>
      <p className={styles.cardText}>{props.text}</p>
      <p className={styles[props.labelStyle]}>{props.label}</p>
      <div>

      </div>
   </div >

   )
}

export default TaskCard