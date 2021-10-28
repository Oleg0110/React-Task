import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { IUserType } from '../../utils/types'
import {
  FindUser,
  TeamAccordion,
  AddedUserCard,
  UserSearch,
} from '../../components'
import useMedia from '../../hooks/useMedia'
import urlValue from '../../utils/functions'
import { ProjectsStore, UserStore } from '../../stores'
import {
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
} from '../../utils/constants'
import styles from './ManageProject.module.scss'

interface IOnSubmitProps {
  text: string
}

const ManageProject: React.FC = () => {
  const { userSearch, usersOnProject, user } = UserStore
  const { projects } = ProjectsStore
  const { projectId } = urlValue(window.location.href)

  const { t } = useTranslation()

  const foundProject = projects.find((found) => found.id === projectId)

  useEffect(() => {
    ProjectsStore.asyncGetProjects()
    UserStore.getUsersOnProject(projectId)
  }, [projectId])

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const owner = user?.projects.find(
    (found: any) => found.projectId === projectId,
  )

  const onSubmit = (data: IOnSubmitProps) => {
    if (owner.state !== 'owner' && owner.state !== 'manager') {
      toast.error('Sorry you are not owner')
    } else {
      UserStore.searchUser(data.text)
    }
  }

  const manager: IUserType[] | null = []
  const developer: IUserType[] | null = []
  const qa: IUserType[] | null = []

  if (usersOnProject) {
    usersOnProject.map((el) => {
      const obj = el.projects.find(
        (found: any) => found.projectId === projectId,
      )

      if (obj?.state === 'manager') {
        manager.push(el)
      } else if (obj?.state === 'developer') {
        developer.push(el)
      } else if (obj?.state === 'qa') {
        qa.push(el)
      }
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
                      <AddedUserCard
                        name={data.name}
                        email={data.email}
                        id={data.id}
                        key={data.id}
                      />
                    ))}
                  </TeamAccordion>
                </div>
                <div>
                  <TeamAccordion title='Developer'>
                    {developer.map((data) => (
                      <AddedUserCard
                        name={data.name}
                        email={data.email}
                        id={data.id}
                        key={data.id}
                      />
                    ))}
                  </TeamAccordion>
                </div>
                <div>
                  <TeamAccordion title='QA'>
                    {qa.map((data) => (
                      <AddedUserCard
                        name={data.name}
                        email={data.email}
                        id={data.id}
                        key={data.id}
                      />
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
