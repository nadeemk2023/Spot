import React from 'react';

function Header() {
  const logoStyle = {
    maxWidth: '100%',
    maxHeight: '250px',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  };
  return (
    <>
      <img src="logo.png" alt="Spot Logo" style={logoStyle} />
    </>
  );
}

export default Header;
