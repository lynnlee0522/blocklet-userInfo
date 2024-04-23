import { useEffect, useState } from 'react';
import { ProfileDisplay } from '../ProfileDisplay';
import { ProfileEdit } from '../ProfileEdit';
import { api } from '../../api';

import styles from './index.module.css';

export const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [mode, setMode] = useState('show');

  const getInfo = async () => {
    console.log(window.blocklet.did);
    const [, result] = await api.getUserInfo({ did: window.blocklet.did });
    setUserInfo(result.data ?? {});
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className={styles.container}>
      {mode === 'show' ? (
        <ProfileDisplay userInfo={userInfo} setMode={setMode} />
      ) : (
        <ProfileEdit userInfo={userInfo} setMode={setMode} getInfo={getInfo} />
      )}
    </div>
  );
};
