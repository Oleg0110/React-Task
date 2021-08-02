import styles from "./TaskBoard.module.scss"
import TaskCard from "../TaskCard/TaskCard"
import bell from "../../assets/icon/bell.svg"
import bell2 from "../../assets/icon/bell.svg"
import bell3 from "../../assets/icon/bell.svg"

const TaskBoard = (props) => {
   return (<div className={styles.taskBoard}>
      <p className={styles.taskTitle}>{props.title}</p>
      <TaskCard text="Engage Jupiter Express out solar system travel" label="SPACE TRAVEL PARTNERS" labelStyle="firstStyle"></TaskCard>
      <TaskCard text="Homepage filter uses an inline style-should use a class" label="LARGE TEAM SUPPORT" labelStyle="secondStyle"></TaskCard>
      <TaskCard text="Requesting available flights is nów taking > 5 seconds" label="SEESPACEEZ PLUS" labelStyle="thirdStyle"></TaskCard>
      <TaskCard text="Register with the Mars Ministry of Revenue" label="LOCAL MARS OFFICE" labelStyle="fourthStyle"></TaskCard>

   </div >

   )

}

export default TaskBoard