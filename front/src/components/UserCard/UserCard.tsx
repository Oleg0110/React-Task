import React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import styles from './UserCard.module.scss';

interface IUserCardProps {
  name: string,
  email: string
}

// !!! ToDo

const UserCard: React.FC<IUserCardProps> = ({ name, email }) => {
  const { t } = useTranslation();

  const copyEmail = async () => {
    if (email === undefined) {
      toast.error('Failed to copy!');
    } else {
      await navigator.clipboard.writeText(email);
      toast.success(`Copied ${email}`);
    }
  };

  return (
    <>
      <div className={styles.back}>
        <button type="button" onClick={copyEmail} className={styles.userCard}>
          <div className={styles.userBlock}>
            <div className={styles.userPhoto} />
            <div className={styles.infoField}>
              <p className={styles.userName}>{name}</p>
              <p className={styles.userEmail}>{email}</p>
            </div>
          </div>
          <div className={styles.copy}>
            <p>{t('people.click')}</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default observer(UserCard);
