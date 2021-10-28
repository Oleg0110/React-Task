import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import urlValue from '../../utils/functions'
import { IColumnType } from '../../utils/types'
import { Button, CreateColumnModalWindow, Column } from '../../components'
import { BoardStore, ProjectsStore, UserStore } from '../../stores'
import useMedia from '../../hooks/useMedia'
import {
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
  ROUTES,
} from '../../utils/constants'
import styles from './Dashboards.module.scss'

const Dashboards: React.FC = ({ children }) => {
  const { user } = UserStore
  const { projects } = ProjectsStore
  const { column }: { column: IColumnType[] } = BoardStore
  const { projectId } = urlValue(window.location.href)

  useEffect(() => {
    BoardStore.asyncGetColumn(projectId)
    ProjectsStore.asyncGetProjects()
  }, [projectId])

  const { t } = useTranslation()
  const history = useHistory()

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const foundProject = projects.find((found) => found.id === projectId)

  const searchValue = useRef<HTMLInputElement>(null)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [searchTitle, setSearchTitle] = useState('')

  // const filteredColumn = column.map(data => {
  //    const filteredTask = data.tasks.filter(name => name.text.includes(searchTitle))
  //    return { ...data, tasks: filteredTask }
  // })

  const handleOnDragEnd = (result: DropResult) => {
    // BoardStore.dragColumn(result)
    console.log(result)
  }

  const owner = user?.projects.find(
    (found: any) => found.projectId === projectId,
  )

  const userState = () => {
    if (owner.state !== 'owner' && owner.state !== 'manager') {
      toast.error('Sorry you are not owner')
    } else {
      setIsModalOpened(!isModalOpened)
    }
  }

  // const da = owner.state

  const userStat = () => {
    // if (owner.state !== 'owner' && owner.state !== 'manager') {
    //   return styles.none
    // }
    // return styles.block
  }

  return (
    <div className={styles.mainBoardStyle}>
      <CreateColumnModalWindow
        isModalOpened={isModalOpened}
        onModalClose={() => setIsModalOpened(false)}
      />
      <div className={styles.boardStyle}>
        <h2 className={styles.mainTitle}>{t('dashboards.title')}</h2>
        <div className={styles.ownerField}>
          <p className={styles.owner}>
            {t('dashboards.owner')}
            <span className={styles.ownerEmail}>{foundProject?.userEmail}</span>
          </p>
        </div>
      </div>
      <div className={`${styles.create} ${styles[`create${responsive}`]}}`}>
        <div>
          <div
            className={`${styles.createButtonPosition} ${
              styles[`createButtonPosition${responsive}`]
            }`}
          >
            <Button onClick={userState} buttonStyle='thirdButtonStyle'>
              <div className={styles.plus} />
              {t('dashboards.create')}
            </Button>
          </div>
        </div>
        <form
          className={styles.searchBoardArea}
          onChange={(e) => {
            e.preventDefault()
            if (searchValue.current) {
              setSearchTitle(searchValue.current.value)
            } else {
              console.warn(
                "Strange behavior, i don't know why, but null came here: searchValue",
              )
            }
          }}
        >
          <input
            type='text'
            placeholder={t('dashboards.taskPlaceholder')}
            className={styles.searchInput}
            ref={searchValue}
          />
          <div className={styles.searchIcon} />
          <Button onClick={(e) => e.preventDefault()}>
            <div className={styles.delete} />
          </Button>
        </form>
        <div className={styles.buttonPosition}>
          <Button
            onClick={() => {
              history.push(
                `${ROUTES.manageProject}${ROUTES.dashboard}/${projectId}`,
              )
            }}
            tooltipContent={t('tooltip.manageProject')}
          >
            <div className={styles.team} />
          </Button>
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className={styles.boardColumn}>
          {column.map((data, index) => (
            <Column
              taskData={data.tasks}
              title={data.title}
              key={data.id}
              columnId={data.id}
              index={index}
            />
          ))}
        </div>
      </DragDropContext>
      {children}
    </div>
  )
}

export default observer(Dashboards)
