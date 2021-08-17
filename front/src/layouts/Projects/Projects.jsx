import styles from "./Projects.module.scss"
import { Button } from "../../components"
import { Accordion } from "../../components"
import { useRef, useState } from "react"
import { ProjectsStore } from "../../stores"
import { observer } from "mobx-react"

const Projects = ({ children, onClick }) => {

   const { projects } = ProjectsStore

   const nameRef = useRef(null)
   const descriptionRef = useRef(null)
   const [isOpened, setIsOpened] = useState(false)
   const [isChangeName, setChangeName] = useState("Create Project")


   return (
      <div className={styles.mainProjectsStyle}>
         <h1 className={styles.mainTitle}>Projects</h1>
         <div className={styles.create}>
            <Button ><span className={styles.filtersButton}>Filters<div className={styles.chevronIcon} alt="Arrow" /></span></Button>
            <Button onClick={() => {
               setIsOpened(!isOpened)
               setChangeName(isChangeName === "Create Project" ? "Hide Block" : "Create Project")
            }} buttonStyle="thirdButtonStyle">{isChangeName}</Button>
         </div>
         <div className={styles.projectsBlocks}>
            <div className={`${styles.accordionBlock} ${isOpened && styles.accordionBlock || styles.accordionBlockMax} `} >
               {projects.map((data) => <Accordion title={data.title} content={data.content} key={data.id} />)}
            </div>
            <div className={`${styles.createProjectArea} ${isOpened && styles.openedCreateProjectBlock || styles.closeCreateProjectBlock} `}>
               <div className={styles.createArea}>
                  <h2 className={styles.createCardTitle}>Create Project</h2>
                  <form className={styles.descriptionProjectBlock} onSubmit={(e) => {
                     e.preventDefault()
                     ProjectsStore.pushProject(nameRef.current.value, descriptionRef.current.value)
                     console.log(nameRef.current.value);
                  }}>
                     <h3 className={styles.projectTitle}>Project Name :</h3>
                     <input type="text" placeholder="Name" className={styles.inputNane} ref={nameRef} />
                     <h3 className={styles.projectTitle}>Project Description :</h3>
                     <textarea type="textarea" placeholder="Description" className={styles.inputText} ref={descriptionRef} />
                     <Button onClick={onClick} buttonStyle="thirdButtonStyle">Create Project</Button>
                  </form>
               </div>
            </div>
         </div>
         {children}
      </div>

   )
}

export default observer(Projects)