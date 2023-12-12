import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Logo.module.css'; 

const Logo = () => {
  const history = useHistory();

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <div className={styles.logoContainer}>
      <img
        src="client/public/logo.png"
        alt="Spot App"
        className={styles.logoImage}
        onClick={handleLogoClick}
      />
    </div>
  );
};

export default Logo;
