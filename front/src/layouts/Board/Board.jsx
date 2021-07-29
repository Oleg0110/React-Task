
import styles from "./Board.module.scss"
import Button from "../../components/Button/Button"
import ComponentsForAccordion from "../../components/ComponentsForAccordion/ComponentsForAccordion";
import Accordion from "../../components/Accordion/Accordion";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Board = ({ boardStyle }) => {
   return <div className={styles[boardStyle]}>
      <div className={styles.boardStyle}>
         <h2>Board</h2>
         <div className={styles.release}>
            <Button buttonStyle="boardReleaseButton">Release</Button>
            <Button><MoreHorizIcon /></Button>
         </div>
      </div>
      <div className={styles.searchQuick}>
         <input type="text" placeholder="Search" className={styles.searchBoard} />
         <Button buttonStyle="boardFiltersButton">Quick Filters <ExpandMoreIcon /></Button>
      </div>
      <div className={styles.accordionStyle}>
         <Accordion page="Page 1"><ComponentsForAccordion>sgvdfbffg</ComponentsForAccordion></Accordion>
         <Accordion page="Page 2" />
         <Accordion page="Page 3" />
         <Accordion page="Page 4" />
      </div>
   </div >
}

export default Board