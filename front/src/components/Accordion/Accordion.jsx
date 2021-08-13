import styles from "./Accordion.module.scss"
import { Button } from ".."
import { Chevron } from ".."
import { useRef, useState } from "react"
import { ProjectsStore } from "../../stores"
import { observer } from "mobx-react"

const Accordion = ({ title, content }) => {

   const [setActive, setActiveState] = useState("")
   const [setHeight, setHeightState] = useState("0px")
   const [setRotate, setRotateState] = useState("accordionIcon")

   const contents = useRef(null)

   function toggleAccordion() {
      setActiveState(setActive === "" ? "active" : "");
      setHeightState(setActive === "active" ? "0px" : `${contents.current.scrollHeight}px`);
      setRotateState(setActive === "active" ? "accordionIcon" : "accordionIcon rotate")
   }

   return (
      <div className={styles.accordionSection}>
         <div className={`${styles.accordion} ${setActive}`} onClick={toggleAccordion}>
            <Button>
               <p className={styles.accordionTitle}>{title}</p>
            </Button>
            <Chevron icon="chevronRight" className={`${setRotate}`} />
            {/* <div className={`${styles.chevronRight} ${setRotate}`} alt="Arrow"></div> */}
         </div>
         <div ref={contents} style={{ maxHeight: `${setHeight}` }} className={styles.accordionContent}>
            <div className={styles.goTo}>
               <p className={styles.contentTitle}>{title}</p>
               <Button buttonStyle="fifthButtonStyle">Go to Project</Button>
            </div>
            <div className={styles.accordionText}>{content}</div>
         </div>
      </div >
   )
}

export default observer(Accordion)