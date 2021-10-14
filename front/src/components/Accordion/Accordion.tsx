import React, { useState } from 'react';
import { Button, DeleteProjectModal, ChangeProjectTitleModal, ChangeProjectContentModal } from '..';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';
import { ROUTES } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import styles from './Accordion.module.scss';

interface IAccordionProps {
  title: string,
  content: string,
  id: string,
}

const Accordion: React.FC<IAccordionProps> = ({ title, content, id }) => {

  const [isOpened, setIsOpened] = useState(false)
  const [isOptionsOpened, setIsOptionsOpened] = useState(false)
  const [isDeleteOpened, setIsDeleteOpened] = useState(false)
  const [isChangeTitleOpened, setIsChangeTitleOpened] = useState(false)
  const [isContentTitleOpened, setIsContentTitleOpened] = useState(false)
  const history = useHistory()

  const { t } = useTranslation();

  return (
    <div className={styles.accordionSection}>
      <DeleteProjectModal id={id} onModalClose={() => setIsDeleteOpened(false)} isModalOpened={isDeleteOpened} />
      <ChangeProjectTitleModal id={id} onModalClose={() => setIsChangeTitleOpened(false)} isModalOpened={isChangeTitleOpened} />
      <ChangeProjectContentModal id={id} onModalClose={() => setIsContentTitleOpened(false)} isModalOpened={isContentTitleOpened} />
      <div className={`${styles.accordion} `} onClick={() => setIsOpened(!isOpened)}>
        <Button>
          <p className={styles.accordionTitle}>{title}</p>
        </Button>
        <div className={`${styles.chevronRight} ${isOpened && styles.chevronDown}`} />
      </div>
      <div className={`${styles.accordionContent} ${isOpened && styles.opened} `}>
        <div className={styles.goTo}>
          <p className={styles.contentTitle}>{title}</p>
          <div className={styles.buttonsField}>
            <Button onClick={() => history.push(`${ROUTES.dashboard}/${id}`)} buttonStyle="fifthButtonStyle">{t("accordion.go")}</Button>
            <Button onClick={() => setIsOptionsOpened(!isOptionsOpened)}>
              <div className={styles.threeDots} />
            </Button>
          </div>
          <div className={`${styles.infoButtonsBackFon} ${isOptionsOpened && styles.infoButtonsOpened}`}>
            <div className={styles.infoButtons}>
              <Button onClick={() => setIsChangeTitleOpened(!isChangeTitleOpened)}>
                <span className={styles.buttonStyle}>{t("accordion.changeTitle")}</span>
              </Button>
              <Button onClick={() => setIsContentTitleOpened(!isContentTitleOpened)}>
                <span className={styles.buttonStyle}>{t("accordion.changeContent")}</span>
              </Button>
              <Button onClick={() => setIsDeleteOpened(!isDeleteOpened)}>
                <span className={styles.buttonStyle}>{t("accordion.delete")}</span>
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.accordionText}>
          {content}
        </div>
      </div>
    </div >
  )
}

export default observer(Accordion)