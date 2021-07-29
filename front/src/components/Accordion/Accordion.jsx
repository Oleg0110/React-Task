import ComponentsForAccordion from "../ComponentsForAccordion/ComponentsForAccordion"
import styles from "./Accordion.module.scss"
import Button from "../Button/Button"

const Accordion = ({ page, accordionStyle }) => {
   return <div className={styles[accordionStyle]}>
      <div className={styles.accordionItem}>
         <input className={styles.accordionItemInput} type="checkbox" id="accordion-1" />
         <label className={styles.accordionTitle} for="accordion-1">
            <p>{page}</p>
         </label>
      </div>
      <ComponentsForAccordion>Create new marketing budgets<Button buttonStyle="accordionButton">Something</Button></ComponentsForAccordion>
   </div>
}


export default Accordion;