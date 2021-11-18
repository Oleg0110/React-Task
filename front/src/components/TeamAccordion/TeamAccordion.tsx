import React, { useState } from 'react'
import { observer } from 'mobx-react'
import styles from './TeamAccordion.module.scss'

interface ITeamAccordionProps {
  title: string
}

const TeamAccordion: React.FC<ITeamAccordionProps> = ({ title, children }) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className={styles.accordionSection}>
      <button
        type='button'
        className={`${styles.accordion} `}
        onClick={() => setIsOpened(!isOpened)}
      >
        <p className={styles.accordionTitle}>{title}</p>
        <div
          className={`${styles.chevronRight} ${isOpened && styles.chevronDown}`}
        />
      </button>
      <div
        className={`${styles.accordionContent} ${isOpened && styles.opened} `}
      >
        <div className={styles.scroll}>
          <div className={styles.usersField}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default observer(TeamAccordion)
