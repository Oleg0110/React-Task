import { observer } from "mobx-react";
import { useRef } from "react";
import { ProjectsStore } from "../../stores";
import Button from "../Button/Button";
import styles from "./CreateProjectArea.module.scss";


const CreateProjectArea = ({ onClick }) => {

   const nameRef = useRef(null)
   const descriptionRef = useRef(null)

   return (
      <div className={styles.createArea}>
         <h2 className={styles.createCardTitle}>Create Project</h2>
         <form className={styles.descriptionProjectBlock} onSubmit={(e) => {
            e.preventDefault()
            ProjectsStore.pushProject(nameRef.current.value, descriptionRef.current.value)
         }}>
            <h3 className={styles.projectTitle}>Project Name :</h3>
            <input type="text" placeholder="Name" className={styles.inputNane} ref={nameRef} />
            <h3 className={styles.projectTitle}>Project Description :</h3>
            <textarea type="textarea" placeholder="Description" className={styles.inputText} ref={descriptionRef} />
            <Button onClick={onClick} buttonStyle="thirdButtonStyle">Create Project</Button>
         </form>
      </div>
   )
}

export default observer(CreateProjectArea);