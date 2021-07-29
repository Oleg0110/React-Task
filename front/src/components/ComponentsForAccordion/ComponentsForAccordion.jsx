import styles from "./ComponentsForAccordion.module.scss"

const ComponentsForAccordion = ({ children, compForAccStyle }) => {
   return <div className={styles[compForAccStyle]}>
      <div className={(styles.accordionContent)}>
         <p>{children}</p>
      </div>
   </div>
}


export default ComponentsForAccordion