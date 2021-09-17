import styles from "./Projects.module.scss"
import { Button, Accordion, CreateProjectArea } from "../../components"
import { useEffect, useRef, useState } from "react"
import { ProjectsStore } from "../../stores"
import { observer } from "mobx-react"
import { useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const Projects = ({ children }) => {

   useEffect(() => {
      ProjectsStore.asyncGetProjects();
   }, []);


   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

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

   const handleOnDragEnd = (result) => {
      ProjectsStore.dragProject(result)
   }

   const accordionBlock = () => {
      return `${(isOpened && styles.accordionBlock) || styles.accordionBlockMax}`
   }

   const createProjectArea = () => {
      return `${(isOpened && styles.openedCreateProjectBlock) || styles.closeCreateProjectBlock}`
   }


   return (
      <div className={styles.mainProjectsStyle}>
         <h1 className={styles.mainTitle}>Projects</h1>
         <div className={styles.create}>
            <div className={` ${styles.searchArea} ${styles[`searchArea${responsive}`]}`}>
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
               }}><div className={styles.change} alt="Arrow" /></Button>
            </div>
            <Button onClick={() => {
               setIsOpened(!isOpened)
               setChangeName(isChangeName === "Create Project" ? "Hide Block" : "Create Project")
            }} buttonStyle="thirdButtonStyle">{isChangeName}</Button>
         </div>
         <div className={`${styles.projectsBlocks} ${styles[`projectsBlocks${responsive}`]}`}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
               <Droppable droppableId="cards">
                  {(provided) => (
                     <div className={`${styles.accordionBlock} ${styles[`accordionBlock${responsive}`]} ${accordionBlock()}`} {...provided.droppableProps} ref={provided.innerRef}>
                        {(isSearchOpened && projectsByContent?.map((data, index) => {
                           return (
                              <Draggable key={data._id} draggableId={data._id} index={index}>
                                 {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                       <Accordion title={data.title} content={data.content} id={data._id} />
                                    </div>
                                 )}
                              </Draggable>
                           );
                        })) || projectsByTitle?.map((data, index) => {
                           return (
                              <Draggable key={data._id} draggableId={data._id} index={index}>
                                 {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                       <Accordion title={data.title} content={data.content} id={data._id} />
                                    </div>
                                 )}
                              </Draggable>
                           );
                        })}
                        {provided.placeholder}
                     </div>
                  )}
               </Droppable>
            </DragDropContext>
            <div className={`${styles.createProjectArea} ${styles[`createProjectArea${responsive}`]} ${createProjectArea()}`}>
               <CreateProjectArea />
            </div>
         </div>
         {children}
      </div>

   )
}

export default observer(Projects)