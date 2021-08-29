import styles from "./Projects.module.scss"
import { Button, Accordion, CreateProjectArea, ProjectsPageSearchArea } from "../../components"
import { useRef, useState } from "react"
import { ProjectsStore } from "../../stores"
import { observer } from "mobx-react"
import useMediaQuery from "../../hooks/useMedia"
import { MEDIUM_DEVICES, RESPONSIVE_DESIGN, SMALL_DEVICES } from "../../utils/constants"
import useMedia from "../../hooks/useMedia2"


const Projects = ({ children }) => {

   const columnCount = useMedia(
      ["(max-width: 576px)", "(max-width: 768px)", "(max-width: 992px)"],
      ["SD", "MD", "LD"],
      "Another"
   );

   console.log(columnCount);


   const smallDevices = useMediaQuery(SMALL_DEVICES)
   const mediumDevices = useMediaQuery(MEDIUM_DEVICES)

   const { projects } = ProjectsStore

   const searchTitleref = useRef(null)
   const searchContentref = useRef(null)
   const [isOpened, setIsOpened] = useState(false)
   const [isChangeName, setChangeName] = useState("Create Project")
   const [searchTitle, setSearchTitle] = useState('')
   const [searchContent, setSearchContent] = useState('')
   const [isSearchOpened, setIsSearchOpened] = useState(false)


   const projectsByTitle = projects.filter(found => found.title.toLowerCase().includes(searchTitle.toLowerCase()))
   const projectsByContent = projects.filter(found => found.content.toLowerCase().includes(searchContent.toLowerCase()))


   return (
      <div className={styles.mainProjectsStyle}>
         <h1 className={styles.mainTitle}>Projects</h1>
         <div className={`${styles.create} ${mediumDevices && isOpened && styles.createMD}`}>
            <div className={`${styles.searchArea} ${smallDevices && styles.searchAreaSD}`}>
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
         {/* {`${styles.projectsBlocks} ${mediumDevices && styles.projectsBlocksMD}`} */}
         <div className={styles[`projectsBlocks${columnCount}`]}>
            <div className={`${styles.accordionBlock} ${isOpened && styles.accordionBlock || styles.accordionBlockMax}
            ${mediumDevices && isOpened && styles.accordionBlockMax}`} >
               {isSearchOpened && projectsByContent.map((data) => <Accordion title={data.title} content={data.content} key={data.id} />) ||
                  projectsByTitle.map((data) => <Accordion title={data.title} content={data.content} key={data.id} />)}
            </div>
            <div className={`${styles.createProjectArea} ${isOpened && styles.openedCreateProjectBlock || styles.closeCreateProjectBlock} 
            ${mediumDevices && styles.createProjectMD}`}>
               <CreateProjectArea />
            </div>
         </div>
         {children}
      </div>

   )
}

export default observer(Projects)