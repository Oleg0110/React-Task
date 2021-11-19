import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import {
  FindUser,
  TeamAccordion,
  AddedUserCard,
  UserSearch,
} from '../../components'
import useMedia from '../../hooks/useMedia'
import urlValue from '../../utils/functions'
import {
  stateOwner,
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
  stateManager,
  stateDeveloper,
  stateQA,
} from '../../utils/constants'
import { IUser } from '../../utils/interface'
import useStore from '../../hooks/useStore'
import styles from './ManageProject.module.scss'

interface IOnSubmitProps {
  text: string
}

const ManageProject: React.FC = () => {
  const { userStore, projectStore } = useStore()
  const { userSearch, usersOnProject, getUsersOnProject, searchUser, userId } =
    userStore
  const { projects, asyncGetProjects } = projectStore

  const history = useHistory()

  const { projectId } = urlValue(history.location.pathname)

  const { t } = useTranslation()

  const foundProject = projects.find((found) => found.id === projectId)

  useEffect(() => {
    asyncGetProjects()
    getUsersOnProject(projectId)
  }, [asyncGetProjects, getUsersOnProject, projectId])

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const onProject = usersOnProject
    ?.find((found) => found.id === userId)
    ?.projects.find((found) => found.projectId === projectId)

  const state =
    onProject?.state === stateOwner || onProject?.state === stateManager

  const onSubmit = (data: IOnSubmitProps) => {
    searchUser(data.text)
  }

  const manager: IUser[] | null = []
  const developer: IUser[] | null = []
  const qa: IUser[] | null = []

  if (usersOnProject) {
    usersOnProject.map((data) => {
      const obj = data.projects.find((found) => found.projectId === projectId)

      if (obj?.state === stateManager) {
        manager.push(data)
      } else if (obj?.state === stateDeveloper) {
        developer.push(data)
      } else if (obj?.state === stateQA) {
        qa.push(data)
      }
      return []
    })
  }

  return (
    <div className={styles.mainBoardStyle}>
      <div className={styles.boardStyle}>
        <h2 className={styles.mainTitle}>{t('manageProject.title')}</h2>
        <div className={styles.ownerField}>
          <p className={styles.owner}>
            {t('manageProject.owner')}
            <span className={styles.ownerEmail}>{foundProject?.userEmail}</span>
          </p>
        </div>
      </div>
      <div className={styles.workArea}>
        {state && (
          <div className={styles.teamFieldSearch}>
            <div
              className={`${styles.backSearchFon} ${
                styles[`backSearchFon${responsive}`]
              }`}
            >
              <div className={styles.addField}>
                <div className={styles.addToProject}>
                  <h2 className={styles.addTitle}>
                    {t('manageProject.addToProject')}
                  </h2>
                  <UserSearch onSubmit={onSubmit} />
                  <div className={styles.foundUser}>
                    <div className={styles.scroll}>
                      <div className={styles.users}>
                        {userSearch?.map((data) => (
                          <FindUser
                            id={data.id}
                            name={data.name}
                            email={data.email}
                            key={data.id}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.teamField}>
          <div
            className={`${styles.backFon} ${styles[`backFon${responsive}`]}`}
          >
            <div className={styles.team}>
              <div className={styles.titleField}>
                <h2 className={styles.teamTitle}>{t('manageProject.team')}</h2>
                <span className={styles.users}>
                  {t('manageProject.totalUsers')}
                  <span className={styles.totalUsers}>
                    {usersOnProject?.length}
                  </span>
                </span>
              </div>
              <hr className={styles.line} />
              <div className={styles.teamScroll}>
                <div>
                  <TeamAccordion title='Manager'>
                    {manager.map((data) => (
                      <AddedUserCard id={data.id} key={data.id} />
                    ))}
                  </TeamAccordion>
                </div>
                <div>
                  <TeamAccordion title='Developer'>
                    {developer.map((data) => (
                      <AddedUserCard id={data.id} key={data.id} />
                    ))}
                  </TeamAccordion>
                </div>
                <div>
                  <TeamAccordion title='QA'>
                    {qa.map((data) => (
                      <AddedUserCard id={data.id} key={data.id} />
                    ))}
                  </TeamAccordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(ManageProject)
