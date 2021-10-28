import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { UserStore } from '../../stores'
import { AddedUserCard } from '../index'
import urlValue from '../../utils/functions'
import styles from './TeamAccordion.module.scss'

interface ITeamAccordionProps {
  title: string
}

const TeamAccordion: React.FC<ITeamAccordionProps> = ({ title, children }) => {
  const [isOpened, setIsOpened] = useState(false)
  const [isOptionsOpened, setIsOptionsOpened] = useState(false)
  const [isChangeTitleOpened, setIsChangeTitleOpened] = useState(false)
  const [isContentTitleOpened, setIsContentTitleOpened] = useState(false)

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
          {/* <div className={styles.buttonsField}>
            <Button onClick={() => setIsOptionsOpened(!isOptionsOpened)}>
              <div className={styles.threeDots} />
            </Button>
          </div>
          <div
            className={`${styles.infoButtonsBackFon} ${
              isOptionsOpened && styles.infoButtonsOpened
            }`}
          >
            <div className={styles.infoButtons}>
              <Button
                onClick={() => setIsChangeTitleOpened(!isChangeTitleOpened)}
              >
                <span className={styles.buttonStyle}>
                  {t('accordion.changeTitle')}
                </span>
              </Button>
              <Button
                onClick={() => setIsContentTitleOpened(!isContentTitleOpened)}
              >
                <span className={styles.buttonStyle}>
                  {t('accordion.changeContent')}
                </span>
              </Button>
              <Button onClick={() => setIsDeleteOpened(!isDeleteOpened)}>
                <span className={styles.buttonStyle}>
                  {t('accordion.delete')}
                </span>
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default observer(TeamAccordion)
