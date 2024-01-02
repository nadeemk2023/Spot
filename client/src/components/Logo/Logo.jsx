import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logo.module.css'; 




const Logo = () => {
  const navigate = useNavigate(); 

  const handleLogoClick = () => {
    navigate('/home');
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
