import styles from "./Projects.module.scss"
import { Button } from "../../components"
import { Accordion } from "../../components"
import { useRef, useState } from "react"
import { ProjectsStore } from "../../stores"
import { observer } from "mobx-react"

const Projects = ({ children, onClick }) => {

   const buttonNamecreate = "Create Project"
   const buttonNamehide = "Hide Block"

   const { projects } = ProjectsStore

   const searchTitleref = useRef(null)
   const nameRef = useRef(null)
   const descriptionRef = useRef(null)
   const [isOpened, setIsOpened] = useState(false)
   const [isChangeName, setChangeName] = useState(buttonNamecreate)
   const [searchTitle, setSearchTitle] = useState('')
   const [searchContent, setSearchContent] = useState('')
   const [isSearchOpened, setIsSearchOpened] = useState(false)
   // const [deleteSearch, setDeleteSearch] = useState(searchTitle)


   const foundTitle = projects.filter(found => found.title.toLowerCase().includes(searchTitle.toLowerCase()))
   const foundContent = projects.filter(found => found.content.toLowerCase().includes(searchContent.toLowerCase()))


   return (
      <div className={styles.mainProjectsStyle}>
         <h1 className={styles.mainTitle}>Projects</h1>
         <div className={styles.create}>
            <div className={styles.searchBlock}>
               <Button ><div className={styles.filtersButton}>Filters<div className={styles.chevronIcon} alt="Arrow" /></div></Button>
               <div className={styles.searckArea}>
                  <form className={styles.titleSearch} onChange={(e) => {
                     e.preventDefault()
                     setSearchTitle(searchTitleref.current.value)
                  }}>
                     <input type="text" placeholder="Title search..." className={styles.searchInput} ref={searchTitleref} />
                     <div className={styles.searchIcon} alt="Search Icon" />
                     <Button><div className={styles.delete} alt="Delete Icon" /></Button>
                  </form>
                  <Button onClick={() => setIsSearchOpened(!isSearchOpened)}><div className={styles["three-dots"]} alt="Dots" /></Button>
                  <form className={`${styles.contentSearch} ${isSearchOpened && styles.contentSearchOpened}`} onChange={(e) => {
                     e.preventDefault()
                     setSearchTitle(searchTitleref.current.value)
                  }}>
                     <input type="text" placeholder="Content search..." className={styles.searchInput}
                        onChange={(e) => setSearchContent(e.target.value)} />
                     <div className={styles.searchIcon} alt="Search Icon" />
                     <Button><div className={styles.delete} alt="Delete Icon" /></Button>
                  </form>
               </div>
            </div>
            <Button onClick={() => {
               setIsOpened(!isOpened)
               setChangeName(isChangeName === buttonNamecreate ? buttonNamehide : buttonNamecreate)
            }} buttonStyle="thirdButtonStyle">{isChangeName}</Button>
         </div>
         <div className={styles.projectsBlocks}>
            <div className={`${styles.accordionBlock} ${isOpened && styles.accordionBlock || styles.accordionBlockMax} `} >
               {foundTitle.map((data) =>
                  <Accordion title={data.title} content={data.content} key={data.id} />
               )}
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