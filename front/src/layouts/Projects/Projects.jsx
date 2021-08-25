import styles from "./Projects.module.scss"
import { Button, Accordion, CreateProjectArea, ProjectsPageSearchArea } from "../../components"
import { useRef, useState } from "react"
import { ProjectsStore } from "../../stores"
import { observer } from "mobx-react"
import useMediaQuery from "../../hooks/useMedia"

const Projects = ({ children }) => {

   const smallDevices = useMediaQuery("(max-width: 576px)")
   const mediumDevices = useMediaQuery("(max-width: 768px)")

   const { projects } = ProjectsStore

   const searchTitleref = useRef(null)
   const searchContentref = useRef(null)
   const [isOpened, setIsOpened] = useState(false)
   const [isChangeName, setChangeName] = useState("Create Project")
   const [searchTitle, setSearchTitle] = useState('')
   const [searchContent, setSearchContent] = useState('')
   const [isSearchOpened, setIsSearchOpened] = useState(false)


   const foundTitle = projects.filter(found => found.title.toLowerCase().includes(searchTitle.toLowerCase()))
   const foundContent = projects.filter(found => found.content.toLowerCase().includes(searchContent.toLowerCase()))

   return (
      <div className={styles.mainProjectsStyle}>
         <h1 className={styles.mainTitle}>Projects</h1>
         <div className={`${styles.create} ${mediumDevices && isOpened && styles.createMedia}`}>
            <div className={`${styles.searckArea} ${smallDevices && styles.searckAreaMedia}`}>
               <form onChange={(e) => {
                  e.preventDefault()
                  setSearchTitle(searchTitleref.current.value,)
                  setSearchContent(searchContentref.current.value)
               }}>
                  <div className={`${styles.titleSearch} ${isSearchOpened && styles.titleSearchClose}`}>
                     <input type="text" placeholder="Title search..." className={styles.searchInput} ref={searchTitleref} />
                     <div className={styles.searchIcon} alt="Search Icon" />
                     <Button onClick={(e) => e.preventDefault()}><div className={styles.delete} alt="Delete Icon" /></Button>
                  </div>
                  <div className={`${styles.contentSearch} ${isSearchOpened && styles.contentSearchOpened}`}>
                     <input type="text" placeholder="Content search..." className={styles.searchInput} ref={searchContentref} />
                     <div className={styles.searchIcon} alt="Search Icon" />
                     <Button onClick={(e) => e.preventDefault()}><div className={styles.delete} alt="Delete Icon" /></Button>
                  </div>
               </form>
               <Button onClick={() => {
                  setIsSearchOpened(!isSearchOpened)
               }}><div className={styles["three-dots"]} alt="Dots" /></Button>
            </div>
            <Button onClick={() => {
               setIsOpened(!isOpened)
               setChangeName(isChangeName === "Create Project" ? "Hide Block" : "Create Project")
            }} buttonStyle="thirdButtonStyle">{isChangeName}</Button>
         </div>
         <div className={`${styles.projectsBlocks} ${mediumDevices && styles.projectsBlocksMedia}`}>
            <div className={`${styles.accordionBlock} ${isOpened && styles.accordionBlock || styles.accordionBlockMax}
            ${mediumDevices && isOpened && styles.accordionBlockMax}`} >
               {isSearchOpened && foundContent.map((data) => <Accordion title={data.title} content={data.content} key={data.id} />) ||
                  foundTitle.map((data) => <Accordion title={data.title} content={data.content} key={data.id} />)}
            </div>
            <div className={`${styles.createProjectArea} ${isOpened && styles.openedCreateProjectBlock || styles.closeCreateProjectBlock} 
            ${mediumDevices && styles.createProjectMedia}`}>
               <CreateProjectArea />
            </div>
         </div>
         {children}
      </div>

   )
}

export default observer(Projects)