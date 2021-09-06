// import { useRef, useState } from "react"
// import { Button } from ".."
import styles from "./ProjectsPageSearchField.module.scss"


const ProjectsPageSearchField = ({ onChange }) => {

   // const searchTitleref = useRef(null)
   // const [isSearchOpened, setIsSearchOpened] = useState(false)

   return (
      <div className={styles.searckArea}>
         {/* <form className={styles.titleSearch} onChange={onChange}>
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
         </form> */}
      </div>
   )
}

export default ProjectsPageSearchField;