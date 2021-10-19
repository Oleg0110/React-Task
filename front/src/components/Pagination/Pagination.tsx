import React from 'react'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { CHOOSE_VALIDATION } from 'utils/validation'
import { UserStore } from '../../stores'
// import urlValue from '../../utils/functions'
import { Button } from '..'
import { ROUTES } from '../../utils/constants'
import styles from './Pagination.module.scss'

interface IPaginationProps {
  usersOnPage: number
  setCurrentPage: (number: number) => void
  currentPage: number
}

interface IOnSubmitProps {
  number: number
}

const Pagination: React.FC<IPaginationProps> = ({
  usersOnPage,
  setCurrentPage,
  currentPage,
}) => {
  const history = useHistory()

  const { t } = useTranslation()

  const { register, handleSubmit } = useForm()

  const { users } = UserStore

  const pageNumbers: number[] = users?.pageNumbers || []

  const nextPage = () => {
    if (pageNumbers.length !== currentPage) {
      const nextCurrentPage = +currentPage + 1

      UserStore.asyncGetUsers(nextCurrentPage, usersOnPage)
      history.push(
        `${ROUTES.people}?page=${nextCurrentPage}&count=${usersOnPage}`,
      )

      setCurrentPage(nextCurrentPage)
    } else {
      toast.error('last page')

      const currentNextPage = pageNumbers.length

      UserStore.asyncGetUsers(currentNextPage, usersOnPage)
      history.push(
        `${ROUTES.people}?page=${currentNextPage}&count=${usersOnPage}`,
      )

      setCurrentPage(currentNextPage)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      const prevCurrentPage = currentPage - 1

      UserStore.asyncGetUsers(prevCurrentPage, usersOnPage)
      history.push(
        `${ROUTES.people}?page=${prevCurrentPage}&count=${usersOnPage}`,
      )

      setCurrentPage(prevCurrentPage)
    } else {
      toast.error('first page')

      const currentPrevPage = 1

      UserStore.asyncGetUsers(currentPrevPage, usersOnPage)
      history.push(
        `${ROUTES.people}?page=${currentPrevPage}&count=${usersOnPage}`,
      )

      setCurrentPage(currentPrevPage)
    }
  }

  const onSubmit = (data: IOnSubmitProps) => {
    if (data.number <= pageNumbers.length && data.number > 0) {
      setCurrentPage(data.number)

      UserStore.asyncGetUsers(data.number, usersOnPage)

      return history.push(
        `${ROUTES.people}?page=${data.number}&count=${usersOnPage}`,
      )
    }
    return toast.error('Sorry page not found')
  }

  const inputData = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const number = +event.target.value

    if (number) {
      setCurrentPage(number)
      UserStore.asyncGetUsers(number, usersOnPage)

      return history.push(
        `${ROUTES.people}?page=${number}&count=${usersOnPage}`,
      )
    }
    return toast.error('Sorry')
  }

  return (
    <div className={styles.numberField}>
      <div className={styles.chooseField}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.backInputFon}>
            <span className={styles.choose}>{t('people.choose')}</span>
            <input
              className={styles.chooseInput}
              type='text'
              autoComplete='off'
              pattern='^-?[0-9]\d*\.?\d*$'
              min={1}
              maxLength={3}
              {...register('number', CHOOSE_VALIDATION)}
            />
          </div>
        </form>
        <div className={styles.backFon}>
          <span className={styles.choose}>{t('people.choose')}</span>
          <select
            size={2}
            className={styles.numbers}
            onChange={(event) => inputData(event)}
          >
            {pageNumbers.map((number) => (
              <option className={styles.option} key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.arrowBack}>
          <div className={styles.arrowField}>
            <div className={styles.buttonsField}>
              <Button onClick={prevPage}>
                <div className={styles.prev} />
              </Button>
              <div className={styles.pages}>
                <span className={styles.currentPage}>{currentPage}</span>
                <span className={styles.of}>{t('people.of')}</span>
                <span className={styles.numberPage}>{pageNumbers.length}</span>
              </div>
              <Button onClick={nextPage}>
                <div className={styles.next} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Pagination)
